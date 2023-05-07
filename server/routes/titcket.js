require('dotenv').config();
const express = require('express');
const router = express.Router();

const Project = require('../entities/project');
const User = require('../entities/user');
const Ticket = require('../entities/ticket');
const auth = require('../middleware/auth');

router.get('/:projectId', auth, async (req, res) => {
  const projectId = req.params.projectId;

  if (!projectId) return res.status(404).send({ success: false, error: 'No parameters provided' });

  try {
    const tickets = await Ticket.find({ project: projectId }).populate({
      path: 'assignee',
      select: '_id email name description status'
    });

    return res.send({ success: true, tickets });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

router.get('/:projectId/:ticketId', auth, async (req, res) => {
  if (!req.params) return res.status(404).send({ success: false, error: 'No parameters provided' });

  const { projectId, ticketId } = req.params;

  try {
    if (!projectId || !ticketId) return res.status(404).send({ success: false, error: 'No parameters provided' });

    const ticket = await Ticket.findOne({ _id: ticketId, project: projectId }).populate('comments.user');

    if (!ticket) return res.status(404).send({ success: false, error: 'No ticket was found' });

    return res.send({ success: true, ticket });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

router.post('/:projectId', auth, async (req, res) => {
  if (!req.params || !req.body) return res.status(404).send({ success: false, error: 'No parameters provided' });

  const projectId = req.params.projectId;
  const { name, description } = req.body;

  if (!projectId || !name) return res.status(404).send({ success: false, error: 'No parameters provided' });

  try {
    const ticket = await Ticket.create({
      name,
      description,
      project: projectId
    });

    await Project.findOneAndUpdate({ _id: projectId }, { $push: { tickets: ticket._id } });

    return res.status(201).send({ success: true, ticket });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

router.patch('/:projectId/:ticketId', auth, async (req, res) => {
  if (!req.body || !req.params) return res.status(404).send({ success: false, error: 'No parameters provided' });

  const { projectId, ticketId } = req.params;
  const { name, description, status, assignee } = req.body;

  try {
    await Ticket.findOneAndUpdate({ project: projectId, _id: ticketId }, { name, description, status, assignee }, { new: true });

    const ticket = await Ticket.findOne({ project: projectId, _id: ticketId }).populate({
      path: 'assignee, comments',
      select: '_id email name description status',
      strictPopulate: false
    });

    return res.status(201).send({ success: true, ticket });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
});

router.patch('/assign/:projectId/:ticketId', auth, async (req, res) => {
  if (!req.body || !req.params) return res.status(404).send({ success: false, error: 'No parameters provided' });

  const { projectId, ticketId } = req.params;
  const { assignee } = req.body;

  if (!assignee) {
    return res.status(404).send({ success: false, error: 'No assignee' });
  }

  try {
    const userToAssign = await User.findOne({ _id: assignee });

    if (!userToAssign) {
      return res.send({ success: false, error: 'The use tou want to assign is unavailable' });
    }

    const isUserToAssignProjectContributor = userToAssign.projects.includes(assignee);

    if (!isUserToAssignProjectContributor) {
      return res.status(404).send({ success: false, error: 'Add this user to project contributors first' });
    }

    const ticket = await Ticket.findOneAndUpdate({ project: projectId, _id: ticketId }, { $set: { assignee } }, { new: true });

    if (!ticket) return res.status(404).send({ success: true, error: 'No ticket found' });

    return res.status(201).send({ success: true, data: ticket });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

router.patch('/comment/:projectId/:ticketId', auth, async (req, res) => {
  if (!req.body || !req.params) return res.status(404).send({ success: false, error: 'No parameters provided' });

  const { projectId, ticketId } = req.params;
  const { content, user } = req.body;

  if (!content || !user) {
    return res.status(404).send({ success: false, error: 'No parameters provided' });
  }

  try {
    await Ticket.findOneAndUpdate(
      { project: projectId, _id: ticketId },
      {
        $push: {
          comments: {
            user,
            content
          }
        }
      }
    );

    const ticket = await Ticket.findOne({ project: projectId, _id: ticketId }).populate('comments.user');

    return res.status(201).send({ success: true, ticket });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = router;

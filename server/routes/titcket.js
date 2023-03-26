require('dotenv').config();
const express = require('express');
const router = express.Router();

const Project = require('../entities/project');
const User = require('../entities/user');
const Ticket = require('../entities/ticket');
const auth = require('../middleware/auth');

router.get('/:projectId', auth, async (req, res) => {
  if (!req.params.projectId) return res.status(404).send({ success: false, error: 'No parameters provided' });

  const projectId = req.params.projectId;
  const userId = req.body.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user.projects.includes(projectId)) {
      return res.status(404).send({ success: false, error: 'This user has no such project in contributions' });
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(404).send({ success: false, error: 'No project was found' });
    }

    const tickets = await Ticket.find({ project: project.id });

    return res.send({ success: true, data: tickets });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

router.post('/:projectId', auth, async (req, res) => {
  if (!req.params.projectId || !req.body.name) return res.status(404).send({ success: false, error: 'No parameters provided' });

  const projectId = req.params.projectId;
  const { userId, name } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user.projects.includes(projectId)) {
      return res.send({ success: false, error: 'This user has no such project in contributions' });
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.send({ success: false, error: 'No project was found' });
    }

    const ticket = await Ticket.create({
      name,
      project: projectId
    });

    await Project.findOneAndUpdate({ _id: projectId }, { $push: { tickets: ticket._id } });

    return res.status(201).send({ success: true, data: ticket });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ success: false, error });
  }
});

module.exports = router;

require('dotenv').config();
const express = require('express');
const router = express.Router();

const Project = require('../entities/project');
const User = require('../entities/user');
const auth = require('../middleware/auth');

router.get('', auth, async (req, res) => {
  try {
    const projects = await Project.find({ contributors: req.body.userId }).populate({
      path: 'contributors tickets lead',
      select: '_id email name description status projectBlock assignee'
    });

    return res.send({ success: true, projects });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

router.get('/:id', auth, async (req, res) => {
  if (!req.params.id) return res.status(404).send({ success: false, error: 'No parameters provided' });

  const projectId = req.params.id;

  try {
    const project = await Project.findOne({ _id: projectId }).populate({
      path: 'contributors tickets lead',
      select: '_id email name description status projectBlock assignee'
    });

    if (!project) {
      return res.status(404).send({ success: false, error: 'No project was found' });
    }

    return res.send({ success: true, project });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

router.post('', auth, async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(404).send({ success: false, error: 'Send needed params' });
  }

  const { name, description, userId } = req.body;

  try {
    const isNameTaken = await Project.findOne({ name });

    if (!!isNameTaken) {
      return res.status(404).send({ success: false, error: 'Given name is already taken' });
    }

    const project = await Project.create({
      name,
      description,
      contributors: [userId],
      lead: userId,
      key: name.slice(0, 3).toUpperCase()
    });

    await User.findOneAndUpdate({ _id: userId }, { $push: { projects: project._id } });

    return res.status(201).send({ success: true, project });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

router.post('/:id/team', auth, async (req, res) => {
  if (!req.body.email || !req.params.id) {
    return res.status(404).send({ success: false, error: 'Send needed params' });
  }

  const email = req.body.email;
  const projectId = req.params.id;

  try {
    const userToAttach = await User.findOne({ email });

    if (!userToAttach) {
      return res.status(404).send({ success: false, error: 'No user found' });
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(404).send({ success: false, error: 'No project found' });
    }

    if (project.contributors.includes(userToAttach._id)) {
      return res.status(404).send({ success: false, error: 'User is attached already' });
    }

    await project.update({ $push: { contributors: userToAttach._id } });

    const result = await Project.findOne({ _id: projectId }).populate({
      path: 'contributors tickets lead',
      select: '_id email name description status projectBlock assignee'
    });

    return res.status(200).send({ success: true, project: result });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = router;

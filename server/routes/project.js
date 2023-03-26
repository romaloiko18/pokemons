require('dotenv').config();
const express = require('express');
const router = express.Router();

const Project = require('../entities/project');
const User = require('../entities/user');
const auth = require('../middleware/auth');

router.get('', auth, async (req, res) => {
  try {
    const projects = await Project.find();

    return res.send({ success: true, data: projects });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

router.get('/:id', auth, async (req, res) => {
  if (!req.params.id) return res.status(404).send({ success: false, error: 'No parameters provided' });

  const projectId = req.params.id;
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

    return res.send({ success: true, data: project });
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
      contributors: [userId]
    });

    await User.findOneAndUpdate({ _id: userId }, { $push: { projects: project._id } });

    return res.status(201).send({ success: true, data: project });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
});

module.exports = router;

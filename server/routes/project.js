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
    return res.send({ success: false, error });
  }
});

router.post('', auth, async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.send({ success: false, error: 'Send needed params' });
  }

  try {
    const isNameTaken = await Project.findOne({ name: req.body.name });

    if (!!isNameTaken) {
      return res.send({ success: false, error: 'Given name is already taken' });
    }

    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      owners: [req.body.userId]
    });

    await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { projects: req.body.userId } });

    return res.send({ success: true, data: project });
  } catch (error) {
    return res.send({ success: false, error });
  }
});

router.post('', auth, async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.send({ success: false, error: 'Send needed params' });
  }

  try {
    const isNameTaken = await Project.findOne({ name: req.body.name });

    if (!!isNameTaken) {
      return res.send({ success: false, error: 'Project with such name already exist' });
    }

    const project = await Project.create({
      name: req.body.name,
      description: req.body.description
    });

    await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { projects: project._id } });

    return res.send({ success: true, data: project });
  } catch (error) {
    return res.send({ success: false, error });
  }
});

module.exports = router;

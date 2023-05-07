const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserProfileDto = require('../dto/user');
require('dotenv').config();

const User = require('../entities/user');

router.get('', auth, async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) return res.status(404).send({ success: false, error: 'No user with such id was found' });

    return res.send({ success: true, user: new UserProfileDto(user) });
  } catch (error) {
    return res.send({ success: false, error });
  }
});

module.exports = router;

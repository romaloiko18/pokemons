const express = require('express');
const router = express.Router();
const User = require('../entities/user');
const Bcrypt = require('bcrypt');
const JsonWebToken = require('jsonwebtoken');

require('dotenv').config();

router.post('/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.send({ success: false, error: 'Send needed params' });
  }

  const { email, password } = req.body;

  try {
    const isEmailTaken = await User.findOne({ email });

    if (!!isEmailTaken) {
      return res.send({ success: false, error: 'User with such email already exist' });
    }

    const user = await User.create({
      email,
      password: Bcrypt.hashSync(password, 10)
    });

    const token = JsonWebToken.sign({ id: user._id, email: user.email }, process.env.SECRET_JWT);

    return res.send({ success: true, token });
  } catch (error) {
    return res.send({ success: false, error });
  }
});

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.send({ success: false, error: 'Send needed params' });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ success: false, error: 'No user wih such email was found' });
    }

    const isPasswordValid = Bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.send({ success: false, error: 'Invalid password' });
    }

    const token = JsonWebToken.sign({ id: user._id, email: user.email }, process.env.SECRET_JWT);

    return res.send({ success: true, token });
  } catch (error) {
    return res.send({ success: false, error });
  }
});

module.exports = router;

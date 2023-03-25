const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
require('dotenv').config();

router.get('/profile', auth, async (req, res) => {
  return res.send({ success: true, data: req.body });
});

module.exports = router;

require('dotenv').config();
const JsonWebToken = require('jsonwebtoken');
const User = require('../entities/user');

module.exports = async (req, res, next) => {
  try {
    if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
      return res.json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JsonWebToken.verify(token, process.env.SECRET_JWT);
    const user = await User.findOne({ _id: decodedToken.id });

    if (!user) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
    } else {
      req.body = { ...req.body, userId: user.id };
      next();
    }
  } catch {
    res.status(401).json({
      success: false,
      error: 'Invalid request!'
    });
  }
};

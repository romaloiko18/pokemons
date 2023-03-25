const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  projects: [
    {
      type: Mongoose.Types.ObjectId,
      ref: 'Project'
    }
  ]
});

module.exports = Mongoose.model('User', UserSchema);

const Mongoose = require('mongoose');

const ProjectSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    contributors: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { collection: 'projects' }
);

module.exports = Mongoose.model('Project', ProjectSchema);

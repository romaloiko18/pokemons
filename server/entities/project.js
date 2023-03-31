const Mongoose = require('mongoose');

const ProjectSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    key: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tickets: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'Ticket'
      }
    ],
    contributors: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'User'
      }
    ],
    lead: {
      type: Mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { collection: 'projects' }
);

module.exports = Mongoose.model('Project', ProjectSchema);

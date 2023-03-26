const Mongoose = require('mongoose');
const { STATUS, PROJECT_BLOCK } = require('../constants');

const TicketSchema = new Mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: [STATUS.OPEN, STATUS.DONE, STATUS.TESTING, STATUS.DEPRECATED, STATUS.CODE_REVIEW, STATUS.IN_PROGRESS, STATUS.READY_FOR_TESTING],
      default: STATUS.OPEN
    },
    password: {
      type: String,
      required: true
    },
    projectBlock: {
      type: String,
      enum: [PROJECT_BLOCK.BACKLOG, PROJECT_BLOCK.CURRENT_SPRINT],
      default: PROJECT_BLOCK.BACKLOG
    },
    project: {
      type: Mongoose.Types.ObjectId,
      ref: 'Project'
    }
  },
  { collection: 'tickets' }
);

module.exports = Mongoose.model('Ticket', TicketSchema);

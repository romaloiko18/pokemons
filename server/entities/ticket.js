const Mongoose = require('mongoose');
const { STATUS, PROJECT_BLOCK } = require('../constants');

const TicketSchema = new Mongoose.Schema(
  {
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
    projectBlock: {
      type: String,
      enum: [PROJECT_BLOCK.BACKLOG, PROJECT_BLOCK.CURRENT_SPRINT],
      default: PROJECT_BLOCK.BACKLOG
    },
    project: {
      type: Mongoose.Types.ObjectId,
      ref: 'Project'
    },
    assignee: {
      type: Mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { collection: 'tickets' }
);

module.exports = Mongoose.model('Ticket', TicketSchema);

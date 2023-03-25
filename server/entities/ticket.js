const Mongoose = require('mongoose');

const TicketSchema = new Mongoose.Schema(
  {
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
    project: {
      type: Mongoose.Types.ObjectId,
      ref: 'Project'
    }
  },
  { collection: 'tickets' }
);

module.exports = Mongoose.model('Ticket', TicketSchema);

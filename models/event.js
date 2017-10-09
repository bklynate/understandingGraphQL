const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }
})

mongoose.model("Event", eventSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }
}, {
    timestamps: true
});

mongoose.model("Location", locationSchema);

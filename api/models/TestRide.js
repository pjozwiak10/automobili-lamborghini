const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testRideSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  model: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

module.exports = TestRide = mongoose.model('Test-Ride', testRideSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: {
    type: String,
    required: true,
  },
  paint: {
    type: Object,
    required: true,
  },
  rims: {
    type: Object,
    required: true,
  },
  topView: {
    type: Object,
    required: true,
  },
  details: [{
    type: Object,
    required: true,
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

module.exports = Car = mongoose.model('Car', carSchema);

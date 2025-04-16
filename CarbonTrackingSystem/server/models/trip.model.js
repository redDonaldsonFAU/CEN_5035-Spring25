const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  _employeeID: { type: mongoose.Schema.Types.ObjectId, required: true },
  _companyID: { type: mongoose.Schema.Types.ObjectId, required: true },
  distance: { type: mongoose.Types.Decimal128, required: true },
  method: { type: String, default: '' },
  points: { type: String, default: '' },
  isdeleted: { type: Boolean, default: false },
},

{ collection: 'trips' });

module.exports = mongoose.model('Trip', tripSchema);
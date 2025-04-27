const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  _employeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  _companyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  distance: { type: mongoose.Types.Decimal128, required: true },
  method: { type: String, default: '' },
  points: { type: mongoose.Schema.Types.Decimal128, default: 0 },
  isdeleted: { type: Boolean, default: false },
  Date: {type: Date, required: true},
},

{ collection: 'trips' });

module.exports = mongoose.model('Trip', tripSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Firstname: String,
  Lastname: String,
  'Home Address': String,
  Email: String,
  Password: String,
  CompanyName: String,
  CompanyAddress: String,
  DistanceToWork: String,
  _companyID: mongoose.Schema.Types.ObjectId,
  _vehicleID: mongoose.Schema.Types.ObjectId,
}, { collection: 'employee' });

module.exports = mongoose.model('Employee', userSchema);
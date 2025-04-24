const mongoose = require('mongoose');
require('mongoose-double')(mongoose); 

const SchemaTypes = mongoose.Schema.Types;

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
  Role: String,
  TotalMiles: SchemaTypes.Double,
  TotalPoints: SchemaTypes.Double,
}, { collection: 'employee' });

module.exports = mongoose.model('Employee', userSchema);
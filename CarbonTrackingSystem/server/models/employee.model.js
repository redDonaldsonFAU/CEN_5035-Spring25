const mongoose = require('mongoose');
require('mongoose-double')(mongoose); 

const SchemaTypes = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  Firstname: String,
  Lastname: String,
  HomeAddress: String,
  Email: String,
  Password: String,
  CompanyName: String,
  CompanyAddress: String,
  DistanceToWork: { type: String, default: '' },
  _companyID: mongoose.Schema.Types.ObjectId,
  _vehicleID: mongoose.Schema.Types.ObjectId,
  Role: String,
  TotalMiles: {type: SchemaTypes.Double, default: 0},
  TotalPoints: {type: SchemaTypes.Double, default: 0},
  CarbonCredits: {type: SchemaTypes.Double, default: 0},
}, { collection: 'employee' });

module.exports = mongoose.model('Employee', userSchema);
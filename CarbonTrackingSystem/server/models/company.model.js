const mongoose = require('mongoose');
require('mongoose-double')(mongoose); 

const SchemaTypes = mongoose.Schema.Types;

const companySchema = new mongoose.Schema({
  CompanyName: String,
  CompanyAddress: String,
  CompanyEmail: String,
  PhoneNumber: String,
  TotalPoints: {type: SchemaTypes.Double, default: 0},
  CarbonCredits: {type: SchemaTypes.Double, default: 0},
}, { collection: 'company' });

module.exports = mongoose.model('Company', companySchema);
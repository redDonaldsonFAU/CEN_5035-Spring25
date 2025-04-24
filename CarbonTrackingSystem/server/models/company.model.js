const mongoose = require('mongoose');
require('mongoose-double')(mongoose); 

const SchemaTypes = mongoose.Schema.Types;

const companySchema = new mongoose.Schema({
  CompanyName: String,
  CompanyAddress: String,
  CompanyEmail: String,
  TotalPoints: SchemaTypes.Double,
  CarbonCredits: SchemaTypes.Double,
}, { collection: 'company' });

module.exports = mongoose.model('Company', companySchema);
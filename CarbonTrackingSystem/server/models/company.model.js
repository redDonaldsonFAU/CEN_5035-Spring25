const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  CompanyName: String,
  CompanyAddress: String,
  CompanyEmail: String,
}, { collection: 'company' });

module.exports = mongoose.model('Company', companySchema);
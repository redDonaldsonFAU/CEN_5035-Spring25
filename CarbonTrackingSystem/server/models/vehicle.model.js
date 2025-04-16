const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  Make: String,
  Model: String,
  'Vehicle Type': String,
}, 

{ collection: 'vehicle' });

module.exports = mongoose.model('Vehicle', vehicleSchema);
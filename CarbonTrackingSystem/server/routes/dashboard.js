const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const Employee = require('../models/employee.model');
const Company = require('../models/company.model');
const Vehicle = require('../models/vehicle.model');

router.get('/:id', async (req, res) => {
    try {
      const user = await Employee.findById(req.params.id);
      if (!user) return res.status(404).send({ error: 'Employee not found' });
  
      const company = await Company.findById(user._companyID);
      const vehicle = await Vehicle.findById(user._vehicleID);
  
      res.json({ user, company, vehicle });
    } catch (error) {
      console.error('Error in dashboard route:', error);
      res.status(500).send({ error: 'Server error' });
    }
  });

  module.exports = router;
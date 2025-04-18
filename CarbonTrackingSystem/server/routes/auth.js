const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');
const Company = require('../models/company.model');
const Vehicle = require('../models/vehicle.model');
const Trip = require('../models/trip.model');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Employee.findOne({ Email: email });

    if (!user || user.Password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
      const company = await Company.findById(user._companyID);
      const vehicles = await Vehicle.findById(user._vehicleID);
      const trips = await Trip.find({ _employeeID: user._id });
    

    res.json({ user, company, vehicles, trips });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

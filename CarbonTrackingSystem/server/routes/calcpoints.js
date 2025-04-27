const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.model');
const Company = require('../models/company.model');
const Employee = require('../models/employee.model')

router.post('/', async (req, res) => {
    const { companyID, employeeID } = req.query;

    if (!companyID && !employeeID) {
      return res.status(400).json({ error: 'Either companyID or employeeID must be provided' });
    }
  
    const filter = { isdeleted: false };
    if (companyID) filter._companyID = companyID;
    if (employeeID) filter._employeeID = employeeID;
  
    try {
      const trips = await Trip.find(filter);
      const rawPoints = trips.reduce((acc, t) => {
        const points = t.points ? parseFloat(t.points.toString()) : 0;
        return acc + points;
        }, 0);

      const rawMiles = trips.reduce((acc, t) => {
        const miles = t.distance ? parseFloat(t.distance.toString()) : 0;
        return acc + miles;
        }, 0);
  
    // Round to 2 decimal places
    const totalPoints = Math.ceil(rawPoints * 100) / 100;
    const totalMiles = Math.ceil(rawMiles * 100) / 100;
    const rawCredits = totalPoints * .001;
    const totalCredits = Math.ceil(rawCredits * 100) /100;

    console.log('Total calculated points:', totalPoints);
    console.log('Total calculated miles:', totalMiles);

    // Retrieve company and update TotalPoints directly
    if (companyID) {
      const company = await Company.findById(companyID);
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }

      company.TotalPoints = totalPoints;  // Set the TotalPoints field
      company.CarbonCredits = totalCredits;
      await company.save();  // Save the updated company

      console.log('Updated Company:', company);
    }

    // If employeeID is passed, update employee TotalPoints
    if (employeeID) {
      const employee = await Employee.findById(employeeID);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      employee.TotalPoints = totalPoints;  // Set the TotalPoints field for the employee
      employee.TotalMiles = totalMiles;
      employee.CarbonCredits = totalCredits;
      await employee.save();  // Save the updated employee
      
      console.log('Updated Employee:', employee);
    }

  
      res.json({ TotalPoints: totalPoints, TotalMiles: totalMiles, TotalCredits: totalCredits });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employee.model');
const Company = require('../models/company.model');

router.post('/', async (req, res) => {
    try {

        const newEmployee = new Employee({
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            HomeAddress: req.body.HomeAddress,
            CompanyName: req.body.CompanyName,
            CompanyAddress: req.body.CompanyAddress,
            Email: req.body.Email,
            Password: req.body.Password,  // assuming it's already hashed or you'll hash it here
            Role: req.body.Role,
                
            _companyID: new mongoose.Types.ObjectId(req.body.companyId),
            _vehicleID: new mongoose.Types.ObjectId(req.body.vehicleId)
          });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
      } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Error adding employee', error });
      }
    });

module.exports = router;
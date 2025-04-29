const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employee.model');

router.get('/', async (req, res) => {
    
    const { companyID } = req.query;
    //const employees = await Employee.find();

    if (!companyID) {
        return res.status(400).json({ msg: 'Missing companyID in request' });
    }

    if (!mongoose.Types.ObjectId.isValid(companyID)) {
        return res.status(400).json({ msg: 'Invalid companyID format' });
      }

    try {
        const employees = await Employee.find({ _companyID: companyID }); // assuming field is named _companyID
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

    });

  module.exports = router;
const express = require('express');
const router = express.Router();
const Company = require('../models/company.model');

router.post('/', async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        console.log(req.body);
        await newCompany.save();
        res.status(201).json({ message: 'Company added successfully', company: newCompany });
      } catch (error) {
        res.status(500).json({ message: 'Error adding company', error });
      }
    });

module.exports = router;
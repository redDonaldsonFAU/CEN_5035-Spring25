const express = require('express');
const router = express.Router();
const Company = require('../models/company.model');

router.get('/', async (req, res) => {
    
    try {
        const companies = await Company.find();
        res.json(companies);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

  module.exports = router;
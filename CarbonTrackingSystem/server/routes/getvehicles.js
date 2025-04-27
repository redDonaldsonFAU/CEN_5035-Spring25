const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle.model');

router.get('/', async (req, res) => {
    
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

  module.exports = router;
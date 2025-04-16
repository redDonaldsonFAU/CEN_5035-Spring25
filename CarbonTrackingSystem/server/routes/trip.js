const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.model');

router.post('/', async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    console.error('Error saving trip:', err);
    res.status(500).send({ error: 'Failed to save trip' });
  }
});

module.exports = router;
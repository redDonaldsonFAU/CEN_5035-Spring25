const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.model');

router.post('/', async (req, res) => {
    const { tripId } = req.body;
  
    try {
      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).send('Trip not found');
      }
  
      trip.isdeleted = true;  // Mark the trip as deleted
      await trip.save();
  
      res.status(200).json({ message: 'Trip marked as deleted', trip });
    } catch (error) {
      res.status(500).send('Error marking trip as deleted: ' + error.message);
    }
  });

  
  module.exports = router;
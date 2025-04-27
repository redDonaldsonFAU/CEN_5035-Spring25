const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.model');

router.get('/', async (req, res) => {
    const { employeeID, companyID } = req.query;
  
    let filter = { isdeleted: false };
  
    if (employeeID) filter._employeeID = employeeID;
    if (companyID) filter._companyID = companyID;
  
    try {
      const trips = await Trip.find(filter)
      .populate('_employeeID', 'Firstname Lastname');
      res.json(trips);
    } catch (err) {
      res.status(500).send('Error fetching trips: ' + err.message);
    }
  });

  module.exports = router;
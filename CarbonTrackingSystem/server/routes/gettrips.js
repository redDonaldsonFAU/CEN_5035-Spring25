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
      .sort({ Date: -1 })
      .populate('_employeeID', 'Firstname Lastname');


      const formattedTrips = trips.map(trip => {
        const date = new Date(trip.Date);

        const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        });

        const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
        });

        // Combine them for display
        trip.Date = `${formattedDate}, ${formattedTime}`;
        //console.log ('updated date', formattedDate);
        //console.log ('updated time', formattedTime);
        //console.log ('updated date', trip.Date);
        return trip;
       
      
        });

      //console.log('formatted', formattedTrips);
      res.json(formattedTrips);
    } catch (err) {
      res.status(500).send('Error fetching trips: ' + err.message);
    }
  });

  module.exports = router;
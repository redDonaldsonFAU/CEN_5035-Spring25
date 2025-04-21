
const express = require('express');
const axios = require('axios');
const router = express.Router();
const API_KEY = 'AIzaSyDJI_7iMTSjBCOQTKI5sa2qrvRijWQpjwk'; // sub api key

router.post('/', async (req, res) => {
    const { source, destination } = req.body;
    if (!source || !destination) {
      return res.status(400).send('Source and destination are required.');
    }
  
    try {
      const result = await getDistance(source, destination);
      res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  async function getDistance(source, destination) {
    const endpoint = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    
    try {
      const response = await axios.get(endpoint, {
        params: {
          origins: source,
          destinations: destination,
          units: 'imperial',
          key: API_KEY
        }
      });
  
      const data = response.data;
  
      if (data.status === "OK") {
        const distanceInfo = data.rows[0].elements[0];
        if (distanceInfo.status === "OK") {
          const distance = distanceInfo.distance.text;  // Distance in human-readable form (e.g., "10 km")
          const duration = distanceInfo.duration.text;  // Duration in human-readable form (e.g., "15 mins")
          return { distance, duration };
        } else {
          throw new Error(`Unable to calculate distance: ${distanceInfo.status}`);
        }
      } else {
        throw new Error(`Error from API: ${data.status}`);
      }
    } catch (error) {
      console.error('Error fetching distance from Google Maps API:', error);
      throw error;
    }
  }

  module.exports = router;
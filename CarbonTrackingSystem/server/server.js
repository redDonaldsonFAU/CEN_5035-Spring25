const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("https");
const app = express();
const PORT = 8080;
const path = require("path");
const cors = require("cors");
const axios = require('axios');
const mongoUri = 'mongodb+srv://ccdb:R4ze8k5MdTt8mzr@carboncreditsdb.mongocluster.cosmos.azure.com/carbondb';
const dashboardRoutes = require('./routes/dashboard');
const tripRoutes = require('./routes/trip');
const authRoutes = require('./routes/auth');

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


app.use(cors());
app.options('/{*any}', cors());
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

app.use(express.static(path.join(__dirname, '../dist/carbon-tracking-system/browser')));

app.use(express.json());

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.get("/vehicle", (req, res) => {
  console.log('vehicle accessed');
  const result = {
    foo: "bar"
  };

  res.json(result);
});

app.post("/signup", (request, response) => {
  console.log(JSON.stringify(request));

  response.send('OK');
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

// API Endpoint to calculate distance
app.post('/api/distance', async (req, res) => {
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

app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/carbon-tracking-system/browser/index.html'));
});
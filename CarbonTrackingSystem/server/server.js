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
const distanceRoute = require('./routes/calcdistance')

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
// API Endpoint to calculate distance
app.use('/api/distance', distanceRoute);

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


app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/carbon-tracking-system/browser/index.html'));
});
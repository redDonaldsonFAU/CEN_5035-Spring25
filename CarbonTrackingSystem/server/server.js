const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("https");
const app = express();
const PORT = 8080;
const path = require("path");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(cors());
app.options('*', cors());
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

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

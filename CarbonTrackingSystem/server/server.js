const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("https");
const app = express();
const PORT = 3000;
const path = require("path");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});


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

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 3000;
const path = require("path");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.get('*', (request, response) => {
  const status = {
    Status: "Running"
  };

  response.send(status);;
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.post("/signup", (request, response) => {
  console.log(JSON.stringify(request));

  response.send('OK');
});

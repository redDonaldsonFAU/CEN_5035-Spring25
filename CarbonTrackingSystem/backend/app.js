const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const https = require('https');

const app = express();
const PORT = 3000;

// enable cors
app.use(cors());

// enable json parser
app.use(express.json());

// route the trip api
const tripRoutes = require('./routes/trips_com');

// use the route
app.use('/api/trips', tripRoutes);

// route string
app.get('/', (req, res) => {
    res.send("Welcome to Trip API !")
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is successfully listening at port:", PORT);
    else
        console.error('An error occurred:', error);
})

// ### http trip URL ###
const tripURL = ''

//call function whenever application is used:
main().catch((error) => console.error(error));

//connecting to mongoose (MongoDB)
async function main() {
    //prepare connection string
    const connectionString = "mongodb+srv://bsanford2016MB:CreamCakes100!@cluster0.lvfdl5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(connectionString);
    mongoose.set("strictQuery", true);

}

//export
module.exports = {app};
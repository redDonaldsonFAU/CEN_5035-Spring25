const mongoose = require('mongoose');

const TripSchema = mongoose.Schema(
    {
        UserId: {
            type: String,
            required: true
        },
        EmployeeId: {
            type: String,
            required: true
        },
        EmployerId: {
            type: String,
            required: true
        },
        startAddress: {
            type: String,
            trim: true
        },
        endAddress: {
            type: String,
            trim: true
        },
        startLat: {
            type: Number,
            required: true
        },
        endLat: {
            type: Number,
            required: true
        },
        startLon: {
            type: Number,
            required: true
        },
        endLon: {
            type: Number,
            required: true
        },
        Method: {
            type: String,
            required: true
        },
        Dist: {
            type: Number,
            required: true
        },
        Points: {
            type: Number,
            required: true
        },
        // email
        Email: {
            type: String,
            required: true
        }
    }, 
    // timestamps
    { timestamps: true } 
);

//export
const Trip = mongoose.model('trips', TripSchema);

module.exports = Trip;
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { Client } = require("@googlemaps/google-maps-services-js");

// Google Maps API key
const googleMapsApiKey = 'AIzaSyDJI_7iMTSjBCOQTKI5sa2qrvRijWQpjwk'; // sub api key

const client = new Client({});

// Google Geocoding Api Function:

async function GCAddress(address) {
    try {
        const response = await client.geocode({
            params: {
                address: address,
                key: googleMapsApiKey,
            },
            // Geocoding Timeout
            timeout: 15000, // miliseconds
        });

        // obtaining corrdinates (lat and lon) from Google Geocoordinaes API.
        const GCResult = response?.data?.results?.[0]
        if (GCResult?.geometry?.location && response?.data?.status === 'OK') {
            const location = GCResult.geometry.location;
            return { lat: location.lat, lon: location.lng };
        } else {
            geocode_error = `Geocoding API Error for address "${address}": ${response.data.status} - ${response.data.error_message || 'Address not found'}`
            console.error(geocode_error);
            return null; 
        }
        // error handling
    } catch (error) {
        geocode_error2 = `Error geocoding address "${address}":`
        console.error(geocode_error2, error);
        return null; 
    }
}

// Google Maps Distance Function:

async function GMapsDist(startLat, startLon, endLat, endLon) {
    try {
        const response = await client.distancematrix({
            params: {
                origins: [`${startLat},${startLon}`],
                destinations: [`${endLat},${endLon}`],
                key: googleMapsApiKey,
            },
            timeout: 15000, // milliseconds
        });

        // 0 indexing as based on matrix array
        const GMapsR = response?.data?.rows?.[0];
        const GMapsE = GMapsR?.elements?.[0];

        if (GMapsE?.status === 'OK') {
            return GMapsE.distance.value; // Distance in meters
        } else {
            throw new Error(`Google Maps API Error: ${response.data.rows[0]?.elements[0]?.status}`);
        }
        // error handling
    } catch (error) {
        distance_error = "Error in getting distance from Google Maps:"
        console.error(distance_error, error);
        distance_error2 = 'Failed to get distance from Google Maps.'
        throw new Error(distance_error2);
    }
}


// Convert Meters to Miles
function Meters2Miles(meters) {
    return meters * 0.000621371
}

// Defualt point value 
const dPoint = 20;

// Build endpoints


// Post: create new trip - Simplified
router.post('/', async (req, res) => {
    try {
        // Declare Consts
        const { 
            startAddress, 
            endAddress, 
            Method, 
            ...tripDetails 
        } = req.body;

        // Initial error check
        const address_error = "Incorrect input. Provide start and/or end addresses";
        if (!startAddress || !endAddress) {
            return res.status(400).json({ message: address_error });
        }

        // GCAddress function is used to get coordinates
        const startCoords = await GCAddress(startAddress);
        const endCoords = await GCAddress(endAddress);

        // GCAddress function error handling for POST
        if (!startCoords) {
            GCAddress_starterror = `Failed to get coordinates for start address: ${startAddress}`
            return res.status(400).json({ message: GCAddress_starterror });
        }
        if (!endCoords) {
            GCAddress_enderror = `Failed to get coordinates for end address: ${endAddress}`
            return res.status(400).json({ message: GCAddress_enderror });
        }

        // Setting declared start and end Lat and Lon from start and end Coords
        const { lat: startLat, lon: startLon } = startCoords;
        const { lat: endLat, lon: endLon } = endCoords;

        // Converting distance from emters to miles
        const distanceInMeters = await GMapsDist(startLat, startLon, endLat, endLon);
        const distanceInMiles = Meters2Miles(distanceInMeters);

        // Applying poitns via switch case
        // Initialize points
        let cPoints = 0;
        switch (Method) {
            case 'gas car': 
                cPoints = distanceInMiles * dPoint * 0.85; 
                break;
            case 'hybrid car': 
                cPoints = distanceInMiles * dPoint * 0.95; 
                break;
            case 'electric car': 
            case 'bus': 
            case 'train': 
            case 'tram': 
                cPoints = distanceInMiles * dPoint; 
                break;
            case 'walk': 
            case 'bike': 
            case 'wfh': 
                cPoints = distanceInMiles * dPoint * 2; 
                break;
            default: 
                transit_error = "Invalid method of transportation."
                return res.status(400).json({ message: transit_error});
        }

        // posting trip
        const newTrip = new Trip({ ...tripDetails, startLat, endLat, startLon, endLon, Method, Dist: distanceInMiles, Points: cPoints });
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);

        // post error handling
    } catch (error) {
        const trip_error = "An error occurred in creating the trip: ";
        console.error(trip_error, error);
        res.status(500).json({ message: "Failed to create trip.", error: error.message });
    }
});

//Get: list
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    }
    // get error handle
    catch(error) { 
        occur_error = "An error occurred";
        res.status(500).json({message: occur_error , error: error});
    }
});


//Get: get by idUpdatedTrip
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const trip = await Trip.findOne({_id: id});
        res.status(200).json(trip);
    }
    // get error handle
    catch(error) {
        res.status(500).json({message: occur_error, error: error});
    }
});


// PUT: update trip

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Declare Consts
        const { 
            startAddress, 
            endAddress, 
            Method, 
            ...tripDetails 
        } = req.body;

        // await put input with error
        const existingTrip = await Trip.findById(id);
        if (!existingTrip) {
            return res.status(404).json({ message: "Trip not found." });
        }

        // put applied ~ Declare in-block variables
        let tripData_Update = { ...tripDetails };
        let recalculateDistance = false;
        let recalculatePoints = false;
        let startLat = existingTrip.startLat;
        let startLon = existingTrip.startLon;
        let endLat = existingTrip.endLat;
        let endLon = existingTrip.endLon;
        let currentMethod = Method || existingTrip.Method;

        // -- scenario: only updating addresses (start/end) with point and distance recalculation --
        // updating start address
        if (startAddress) {
            const startCoords = await GCAddress(startAddress);
            if (startCoords) {
                startLat = startCoords.lat;
                startLon = startCoords.lon;
                tripData_Update.startLat = startLat;
                tripData_Update.startLon = startLon;
                recalculateDistance = true;
                recalculatePoints = true;
            }
        }

        // updating end address
        if (endAddress) {
            const endCoords = await GCAddress(endAddress);
            if (endCoords) {
                endLat = endCoords.lat;
                endLon = endCoords.lon;
                tripData_Update.endLat = endLat;
                tripData_Update.endLon = endLon;
                recalculateDistance = true;
                recalculatePoints = true;
            }
            // Put accepted: assesssing new coordinates and updating
        } else if (req.body.startLat !== undefined && req.body.startLon !== undefined && req.body.endLat !== undefined && req.body.endLon !== undefined) {
            startLat = parseFloat(req.body.startLat);
            startLon = parseFloat(req.body.startLon);
            endLat = parseFloat(req.body.endLat);
            endLon = parseFloat(req.body.endLon);
            // Put error handlign for incoorect lat and lon
            if (isNaN(startLat) || isNaN(startLon) || isNaN(endLat) || isNaN(endLon)) {
                latlon_error = "Latitude and or Longitude are invalid values."
                return res.status(400).json({ message: latlon_error });
            }

            // Put accepting new coordinates
            tripData_Update.startLat = startLat;
            tripData_Update.startLon = startLon;
            tripData_Update.endLat = endLat;
            tripData_Update.endLon = endLon;
            recalculateDistance = true;
            recalculatePoints = true;
        }

        // update distance - recalculate
        if (recalculateDistance) {
            const distanceInMeters = await GMapsDist(startLat, startLon, endLat, endLon);

        // convert meters to miles
            distanceInMiles = Meters2Miles(distanceInMeters);
            tripData_Update.Dist = distanceInMiles;

        // distance remains the same if coordinates are not changed
        } else if (existingTrip.Dist !== undefined) {
            distanceInMiles = existingTrip.Dist;
        }
        
        // update method
        if (Method) {
            tripData_Update.Method = Method;
            recalculatePoints = true;
            currentMethod = Method;
        }

        // Point recalculation for Put
        if (
            recalculatePoints && 
            distanceInMiles !== 
            undefined && 
            currentMethod) {

            // Re-initialize points
            let cPoints = 0;
            switch (currentMethod) {
                case 'gas car': 
                    cPoints = distanceInMiles * dPoint * 0.85; 
                    break;
                case 'hybrid car': 
                    cPoints = distanceInMiles * dPoint * 0.95; 
                    break;
                case 'electric car': 
                case 'bus': 
                case 'train': 
                case 'tram': 
                    cPoints = distanceInMiles * dPoint; 
                    break;
                case 'walk': 
                case 'bike': 
                case 'wfh': 
                    cPoints = distanceInMiles * dPoint * 2; 
                    break;
                default: 
                    return res.status(400).json({ message: transit_error });
            }
            if (!isNaN(cPoints)) {
                tripData_Update.Points = cPoints;
            } else {
                points_error = `Error: Calculated points (NaN) for trip ID ${id}, method: ${currentMethod}, distance: ${distanceInMiles}`
                console.error(points_error);
                points_error2 = "Error calculating points."
                return res.status(500).json({ message: points_error2 });
            }
        }

        // upddating trip
        const trip_updated = await Trip.findOneAndUpdate(
            { _id: id },
            { $set: tripData_Update },
            { new: true }
        );

        // trip error handle
        if (!trip_updated) {
            return res.status(404).json({ message: "Trip not found." });
        }

        res.status(200).json(trip_updated);

    } catch (error) {
        // put error handle
        const occur_error = "An error occurred during the update: ";
        console.error("PUT /:id Error", error);
        res.status(500).json({ message: occur_error, error: error.message });
    }
});

//Delete: delete
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let deletedTrip = await Trip.deleteOne({_id: id});
        res.status(200).json(deletedTrip);
    }
        // delete error handle
        catch(error) {
        res.status(500).json({message: occur_error, error: error});
    }
});

module.exports = router;

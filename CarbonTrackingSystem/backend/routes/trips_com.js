const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { Client } = require("@googlemaps/google-maps-services-js");

// Google Maps API key
const googleMapsApiKey = 'AIzaSyDJI_7iMTSjBCOQTKI5sa2qrvRijWQpjwk'; // sub api key

const client = new Client({});

// Google Geocoding Api Function:

async function geocodeAddress(address) {
    try {
        const response = await client.geocode({
            params: {
                address: address,
                key: googleMapsApiKey,
            },
            // Geocoding Timeout
            timeout: 3000, 
        });

        if (response.data.results.length > 0 && response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return { lat: location.lat, lon: location.lng };
        } else {
            console.error(`Geocoding API Error for address "${address}": ${response.data.status} - ${response.data.error_message || 'Address not found'}`);
            return null; 
        }
    } catch (error) {
        console.error(`Error geocoding address "${address}":`, error);
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
            timeout: 1000, // milliseconds
        });

        if (response.data.rows[0]?.elements[0]?.status === 'OK') {
            return response.data.rows[0].elements[0].distance.value; // Distance in meters
        } else {
            throw new Error(`Google Maps API Error: ${response.data.rows[0]?.elements[0]?.status}`);
        }
    } catch (error) {
        console.error("Error fetching distance from Google Maps:", error);
        throw new Error('Failed to get distance from Google Maps.');
    }
}


// Convert Meters to Miles
function Meters2Miles(meters) {
    return meters * 0.000621371
}

// Defualt point value 
const dPoint = 20;

// Build endpoints


// Post: create new trip - accounting for distance via Azure Maps and Point system
router.post('/', async (req, res) => {
    try {
        const {
            startAddress,
            endAddress,
            Method,
            ...tripDetails
        } = req.body;

        let startLat, startLon, endLat, endLon;

        if (startAddress && endAddress) {
            const startGeocodeResult = await geocodeAddress(startAddress);
            const endGeocodeResult = await geocodeAddress(endAddress);

            if (startGeocodeResult && endGeocodeResult) {
                startLat = startGeocodeResult.lat;
                startLon = startGeocodeResult.lon;
                endLat = endGeocodeResult.lat;
                endLon = endGeocodeResult.lon;
            } else {
                return res.status(400).json({ message: "Failed to geocode one or both addresses." });
            }
        } else if (req.body.startLat && req.body.startLon && req.body.endLat && req.body.endLon) {
            startLat = parseFloat(req.body.startLat);
            startLon = parseFloat(req.body.startLon);
            endLat = parseFloat(req.body.endLat);
            endLon = parseFloat(req.body.endLon);
            if (isNaN(startLat) || isNaN(startLon) || isNaN(endLat) || isNaN(endLon)) {
                return res.status(400).json({ message: "Latitude and or Longitude values are Invalid." });
            }
        } else {
            return res.status(400).json({ message: "Please provide either start/end addresses or start/end coordinates." });
        }

        const distanceInMeters = await GMapsDist(startLat, startLon, endLat, endLon);
        const distanceInMiles = Meters2Miles(distanceInMeters);

        // Intialize Points system (cPoints)

        let cPoints = 0;

        // Utilize swtich/case statements in place of if/else for point calculation:

        switch(Method) {
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
                return res.status(400).json({ message: "Invalid method of transportation."});
        }

        const newTrip = new Trip ({
            ...tripDetails,
            startLat: startLat,
            endLat: endLat,
            startLon: startLon,
            endLon: endLon,
            Method: Method,
            Dist: distanceInMiles,
            Points: cPoints
        });

        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);

        } catch (error) {
        console.error("An error occurred in creating the trip: ", error);
        res.status(500).json({ message: "Failed to create trip.", error: error.message });
        }
});

//Get: list
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    }
    catch(error) {
        res.status(500).json({message: "An error occurred", error: error});
    }
});


//Get: get by idUpdatedTrip
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const trip = await Trip.findOne({_id: id});
        res.status(200).json(trip);
    }
    catch(error) {
        res.status(500).json({message: "An error occurred", error: error});
    }
});


// PUT: update trip

// Based on the complexities of updated trips vs transportation methods, PUT
// will be updated via two basic components, the first component (scenario 1) 
// pretty much updates the empolyees trip if they change the latitudes and longitudes.
// The second component (scenario 2) updates the employees trip if only the method
// is updated.

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {
            startAddress,
            endAddress,
            Method,
            ...tripDetails
        } = req.body;

        let tripData_Update = { ...tripDetails };
        let recalculateDistance = false;
        let recalculatePoints = false;
        let startLat, startLon, endLat, endLon;
        let distanceInMeters;
        let distanceInMiles; 

        // -- Scenario 1: Destiantion AND Method change
        const existingTrip = await Trip.findById(id);
        if (!existingTrip) {
            return res.status(404).json({ message: "Trip not found." });
        }

        if (startAddress && endAddress) {
            const startGeocodeResult = await geocodeAddress(startAddress);
            const endGeocodeResult = await geocodeAddress(endAddress);

            if (startGeocodeResult && endGeocodeResult) {
                startLat = startGeocodeResult.lat;
                startLon = startGeocodeResult.lon;
                endLat = endGeocodeResult.lat;
                endLon = endGeocodeResult.lon;
                tripData_Update.startLat = startLat;
                tripData_Update.startLon = startLon;
                tripData_Update.endLat = endLat;
                tripData_Update.endLon = endLon;
                recalculateDistance = true;
                recalculatePoints = true;
            } else {
                return res.status(400).json({ message: "Failed to geocode one or both addresses." });
            }
        } else if (req.body.startLat !== undefined && req.body.startLon !== undefined && req.body.endLat !== undefined && req.body.endLon !== undefined) {
            startLat = parseFloat(req.body.startLat);
            startLon = parseFloat(req.body.startLon);
            endLat = parseFloat(req.body.endLat);
            endLon = parseFloat(req.body.endLon);
            if (isNaN(startLat) || isNaN(startLon) || isNaN(endLat) || isNaN(endLon)) {
                return res.status(400).json({ message: "Latitude and or Longitude are invalid values." });
            }
            tripData_Update.startLat = startLat;
            tripData_Update.startLon = startLon;
            tripData_Update.endLat = endLat;
            tripData_Update.endLon = endLon;
            recalculateDistance = true;
            recalculatePoints = true;
        }
        // -- Scenario 2: ONLY Method change

        if (recalculateDistance) {
            distanceInMeters = await GMapsDist(tripData_Update.startLat || existingTrip.startLat, tripData_Update.startLon || existingTrip.startLon, tripData_Update.endLat || existingTrip.endLat, tripData_Update.endLon || existingTrip.endLon);
            distanceInMiles = Meters2Miles(distanceInMeters);
            tripData_Update.Dist = distanceInMiles;
        } else if (existingTrip.Dist !== undefined && existingTrip.Dist !== null) {
            distanceInMiles = existingTrip.Dist;
        } else {
            console.warn(`Warning: No valid distance available for trip ID ${id} during method update.`);
            distanceInMiles = 0; 
        }

        if (Method) {
            tripData_Update.Method = Method;
            recalculatePoints = true;
        }

        if (recalculatePoints) {
            const currentMethod = tripData_Update.Method || existingTrip.Method;
            if (existingTrip.Dist !== undefined && currentMethod) {
                let cPoints = 0;
               
                // Utilize swtich/case statements in place of if/else for point calculation:

        switch(currentMethod) {
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
                return res.status(400).json({ message: "Invalid method of transportation."});
        }

                if (!isNaN(cPoints)) {
                    tripData_Update.Points = cPoints;
                } else {
                    console.error(`Error: Calculated points (NaN) for trip ID ${id}, method: ${currentMethod}, distance: ${distanceInMiles}`);
                    return res.status(500).json({ message: "Error calculating points." });
                }
            }
        }

        const trip_updated = await Trip.findOneAndUpdate(
            { _id: id },
            { $set: tripData_Update },
            { new: true }
        );

        if (!trip_updated) {
            return res.status(404).json({ message: "Trip not found." });
        }

        res.status(200).json(trip_updated);

    } catch (error) {
        console.error("PUT /:id Error", error);
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
});

//Delete: delete
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let deletedTrip = await Trip.deleteOne({_id: id});
        res.status(200).json(deletedTrip);
    }
        catch(error) {
        res.status(500).json({message: "An error occurred", error: error});
    }
});

module.exports = router;

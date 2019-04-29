const mongoose = require('mongoose');
const AirportResource = require('./airport.resources.js');
const Airport = require('./airports.js');

const FlightSchema = new mongoose.Schema({
    flightCode: {
        type: String,
        required: true,
        trim: true
    },
    flightId: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true }
    },
    airline: {
        type: String,
        required: true,
        trim: true
    },
    departureDate: {
        type: Date,
        required: true,
        trim: true
    },
    arrivalDate: {
        type: Date,
        required: true,
        trim: true
    },
    departureAirport: Airport.AirportSchema,
    arrivalAirport: Airport.AirportSchema,
    airportResources: AirportResource.AirportResourceSchema,
    delay: {
        type: Number,
        trim: true
    }
});

FlightSchema.pre('save', function (next) {
    next();
});

FlightSchema.statics.findByFlightId = function(flightId) {
    return Flight.findOne({flightId});
};

FlightSchema.statics.findByFlightCodeAndArrivalDate = function(flightCode,arrivalDate) {
    return Flight.findOne({flightCode: flightCode, arrivalDate: arrivalDate});
};

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;
const mongoose = require('mongoose');
const AirportResources = require('airport.resources');
const Airport = require('schemas/airports');

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
    departureAirport: Airport,
    arrivalAirport: Airport,
    airportResources: AirportResources,
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
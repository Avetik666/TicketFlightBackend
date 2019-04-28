const mongoose = require('mongoose');
const AirportResources = require('airport.resources');
const Airport = require('schemas/airports');

const FlightSchema = new mongoose.Schema({
    flightCode: {
        type: String,
        required: true,
        trim: true
    },
    flightID: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
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
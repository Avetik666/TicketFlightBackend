const mongoose = require('mongoose');

const AirportResourceSchema = new mongoose.Schema({
    departureTerminal: {
        type: String,
        trim: true
    },
    departureGate: {
        type: String,
        trim: true
    },
    arrivalTerminal: {
        type: String,
        trim: true
    },
    arrivalGate: {
        type: String,
        trim: true
    },
    baggageClaim: {
        type: String,
        trim: true
    }
});

const AirportResource = mongoose.model('AirportResource',AirportResourceSchema);

module.exports = AirportResource;
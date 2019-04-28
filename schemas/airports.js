const mongoose = require('mongoose');

const AirportSchema = new mongoose.Schema({
    shortName: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    cityName: {
        type: String,
        required: true,
        trim: true
    },
    countryName: {
        type: String,
        required: true,
        trim: true
    },
    weatherURL: {
        type: String,
        trim: true
    }
});

const Airport = mongoose.model('Airport',AirportSchema);

module.exports = Airport;
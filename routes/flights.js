const express = require('express');
const request = require('request');

const path = process.cwd();
const Flight = require(`${path}/models/flights.js`);
const {FlightAlreadyExists} = require(`${path}/errors/errors.js`);

const router = express.Router();

const appId = '1a04733c';
const appKey = '9707581d0840cc6b8ed9d61128915b0f';

async function asyncRequest(requestURL) {
    return new Promise((resolve, reject) => (
        request.get(requestURL, function (err, res, body) {
                resolve(JSON.parse(body));
                reject(err);
            }
        )
    ));
}

router.get('/', async function (req, res, next) {
    let body;
    try {
        const flightCode = req.query.flightCode;
        const flightNumber = req.query.flightNumber;
        const year = req.query.year;
        const month = req.query.month;
        const day = req.query.day;
        let requestURL = `https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${flightCode}/${flightNumber}/dep/${year}/${month}/${day}?appId=${appId}&appKey=${appKey}&utc=false`;

        body = await asyncRequest(requestURL);
        const response = await Flight.createFlight(body);
        res.json(response);
    } catch (e) {
        if(e instanceof FlightAlreadyExists){
            const response = await Flight.getFlight(body.flightStatuses[0].flightId);
            res.json(response);
        }
        next(e);
    }

});

module.exports = router;
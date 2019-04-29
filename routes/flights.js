const express = require('express');
const request = require('request');

const path = process.cwd();
const Flight = require(`${path}/models/flights.js`);

const router = express.Router();

const appId = '1a04733c';
const appKey = '9707581d0840cc6b8ed9d61128915b0f';

const flightCode = 'AA';
const flightNumber = '100';
const year = '2019';
const month = '4';
const day = '27';

const requestURL = `https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${flightCode}/${flightNumber}/dep/${year}/${month}/${day}?appId=${appId}&appKey=${appKey}&utc=false`;

// request.get(requestURL,function(err,res,body1){
//     body1 = JSON.parse(body1);
//     console.log(body1.request);
// });

async function asyncRequest() {
    return new Promise((resolve, reject) => (
        request.get(requestURL, function (err, res, body) {
                // console.log(body);
                // console.log(JSON.parse(body));
                const output = JSON.parse(body);
                console.log(output.flightStatuses[0].airportResources.departureTerminal);
                resolve(JSON.parse(body));
            }
        )
    ));
}
router.get('/', async function (req, res, next) {
    try {
        const body = await asyncRequest();
        console.log(body);
        await Flight.createFlight(body);
        res.json();

    } catch (e) {
        next(e);
    }

});

module.exports = router;
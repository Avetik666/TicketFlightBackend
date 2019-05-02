const express = require('express');
const request = require('request');

const path = process.cwd();
const Flight = require(`${path}/models/flights.js`);

const router = express.Router();

const appId = '1a04733c';
const appKey = '9707581d0840cc6b8ed9d61128915b0f';

// request.get(requestURL,function(err,res,body1){
//     body1 = JSON.parse(body1);
//     console.log(body1.request);
// });

async function asyncRequest(requestURL) {
    return new Promise((resolve, reject) => (
        request.get(requestURL, function (err, res, body) {
                const output = JSON.parse(body);
                resolve(JSON.parse(body));
            }
        )
    ));
}
router.get('/', async function (req, res, next) {
    try {
        // console.log(req.query.flightCode);
        // console.log(req.query.flightNumber);
        // console.log(req.query.year);
        // console.log(req.query.month);
        // console.log(req.query.day);
        const flightCode = req.query.flightCode;
        const flightNumber = req.query.flightNumber;
        const year = req.query.year;
        const month = req.query.month;
        const day = req.query.day;
        let requestURL = `https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${flightCode}/${flightNumber}/dep/${year}/${month}/${day}?appId=${appId}&appKey=${appKey}&utc=false`;

        const body = await asyncRequest(requestURL);
        console.log(body);

        await Flight.createFlight(body);
        res.json();

    } catch (e) {
        next(e);
    }

});

module.exports = router;
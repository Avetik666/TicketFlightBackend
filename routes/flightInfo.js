const express = require('express');
const router = express.Router();
const path = process.cwd();
const request = require('request');
// const User = require(`${path}/models/users.js`);
// const _ = require('lodash');
const appId = '1a04733c';
const appKey = '9707581d0840cc6b8ed9d61128915b0f';

const flightCode = 'AA';
const flightNumber = '100';
const year = '2019';
const month = '04';
const day = '27';

const requestURL = `https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${flightCode}/${flightNumber}/dep/${year}/${month}/${day}?appId=${appId}&appKey=${appKey}&utc=false`;

// request.get(requestURL,function(err,res,body1){
//     body1 = JSON.parse(body1);
//     console.log(body1.request.airline.fsCode);
// });


router.get('flight', async function(req, res,next) {
    let body = req.body;
    try {
        request.get(requestURL,function(err,res,body1){
            body = JSON.parse(body1);
        });
        res.json();
    }
    catch (e) {
        next(e);
    }

});

module.exports = router;
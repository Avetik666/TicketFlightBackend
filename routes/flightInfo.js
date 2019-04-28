const express = require('express');
const router = express.Router();
const path = process.cwd();
// const User = require(`${path}/models/users.js`);
// const _ = require('lodash');
const appId = '1a04733c';
const appKey = '9707581d0840cc6b8ed9d61128915b0f';

const flightCode = 'AA';
const flightNumber = '100';
const year = '2019';
const month = '04';
const day = '27';

const request = `https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${flightCode}/${flightNumber}/dep/${year}/${month}/${day}?appId=${appId}&appKey=${appKey}&utc=false`;

console.log(request);
router.get('flight', async function(req, res,next) {
    const body = req.body;
    try {
        const user = await User.login(body.username, body.password);
        console.log(res.json());
        res.json();
    }
    catch (e) {
        next(e);
    }

});

module.exports = router;
const flights = require('../models/flights.js');
const expect = require('chai').expect;
const errors = require('../errors/errors.js');

describe('testing', function() {

    const body = {"request":{"airline":{"requestedCode":"AA","fsCode":"AA"},"flight":{"requested":"100","interpreted":"100"},"date":{"year":"2019","month":"5","day":"21","interpreted":"2019-05-21"},"utc":{"requested":"false","interpreted":false},"airport":{},"codeType":{},"extendedOptions":{},"url":"https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/AA/100/dep/2019/05/21"},"appendix":{"airlines":[{"fs":"AA","iata":"AA","icao":"AAL","name":"American Airlines","phoneNumber":"08457-567-567","active":true},{"fs":"LY","iata":"LY","icao":"ELY","name":"El Al","phoneNumber":"+ 972-3-9771111","active":true},{"fs":"AY","iata":"AY","icao":"FIN","name":"Finnair","phoneNumber":"+ 358 600 140 140","active":true},{"fs":"IB","iata":"IB","icao":"IBE","name":"Iberia","phoneNumber":"1800 772 4642","active":true},{"fs":"BA","iata":"BA","icao":"BAW","name":"British Airways","phoneNumber":"1-800-AIRWAYS","active":true},{"fs":"GF","iata":"GF","icao":"GFA","name":"Gulf Air","phoneNumber":"973 17 335 777","active":true}],"airports":[{"fs":"JFK","iata":"JFK","icao":"KJFK","faa":"JFK","name":"John F. Kennedy International Airport","street1":"JFK Airport","city":"New York","cityCode":"NYC","stateCode":"NY","postalCode":"11430","countryCode":"US","countryName":"United States","regionName":"North America","timeZoneRegionName":"America/New_York","weatherZone":"NYZ178","localTime":"2019-05-20T15:27:18.149","utcOffsetHours":-4.0,"latitude":40.642335,"longitude":-73.78817,"elevationFeet":13,"classification":1,"active":true,"delayIndexUrl":"https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/JFK?codeType=fs","weatherUrl":"https://api.flightstats.com/flex/weather/rest/v1/json/all/JFK?codeType=fs"},{"fs":"LHR","iata":"LHR","icao":"EGLL","faa":"","name":"London Heathrow Airport","city":"London","cityCode":"LON","stateCode":"EN","countryCode":"GB","countryName":"United Kingdom","regionName":"Europe","timeZoneRegionName":"Europe/London","weatherZone":"","localTime":"2019-05-20T20:27:18.149","utcOffsetHours":1.0,"latitude":51.469603,"longitude":-0.453566,"elevationFeet":80,"classification":1,"active":true,"delayIndexUrl":"https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/LHR?codeType=fs","weatherUrl":"https://api.flightstats.com/flex/weather/rest/v1/json/all/LHR?codeType=fs"}],"equipments":[{"iata":"77W","name":"Boeing 777-300ER","turboProp":false,"jet":true,"widebody":true,"regional":false}]},"flightStatuses":[{"flightId":1000517347,"carrierFsCode":"AA","flightNumber":"100","departureAirportFsCode":"JFK","arrivalAirportFsCode":"LHR","departureDate":{"dateLocal":"2019-05-21T18:10:00.000","dateUtc":"2019-05-21T22:10:00.000Z"},"arrivalDate":{"dateLocal":"2019-05-22T06:20:00.000","dateUtc":"2019-05-22T05:20:00.000Z"},"status":"S","schedule":{"flightType":"J","serviceClasses":"RFJY","restrictions":""},"operationalTimes":{"publishedDeparture":{"dateLocal":"2019-05-21T18:10:00.000","dateUtc":"2019-05-21T22:10:00.000Z"},"publishedArrival":{"dateLocal":"2019-05-22T06:20:00.000","dateUtc":"2019-05-22T05:20:00.000Z"},"scheduledGateDeparture":{"dateLocal":"2019-05-21T18:10:00.000","dateUtc":"2019-05-21T22:10:00.000Z"},"estimatedGateDeparture":{"dateLocal":"2019-05-21T18:10:00.000","dateUtc":"2019-05-21T22:10:00.000Z"},"scheduledGateArrival":{"dateLocal":"2019-05-22T06:20:00.000","dateUtc":"2019-05-22T05:20:00.000Z"},"estimatedGateArrival":{"dateLocal":"2019-05-22T06:20:00.000","dateUtc":"2019-05-22T05:20:00.000Z"}},"codeshares":[{"fsCode":"AY","flightNumber":"4012","relationship":"L"},{"fsCode":"BA","flightNumber":"1511","relationship":"L"},{"fsCode":"GF","flightNumber":"6654","relationship":"L"},{"fsCode":"IB","flightNumber":"4218","relationship":"L"},{"fsCode":"LY","flightNumber":"8051","relationship":"L"}],"flightDurations":{"scheduledBlockMinutes":430},"airportResources":{"departureTerminal":"8","departureGate":"6","arrivalTerminal":"3"},"flightEquipment":{"scheduledEquipmentIataCode":"77W","actualEquipmentIataCode":"77W","tailNumber":"N733AR"}}]};

    before(async function() {
        await flights.createFlight(body);
    });

    after(async function() {
        await flights.deleteFlight("1000517347");
    });

    it('find a flight', async () => {
        const flight = await flights.getFlight( "1000517347");
        return expect(flight.flightId).eql("1000517347");

    });

    it('returns flightNotFound for flight not in database', function() {
        return flights.getFlight('123')
            .catch(err => {
                return expect(err instanceof errors.FlightNotFound).eql(true);
            });
    });

    it('returns flightNotFound for empty filter', function() {
        return flights.getFlight('')
            .catch(err => {
                return expect(err instanceof errors.FlightNotFound).eql(true);
            });
    });

    it('returns flightNotFound for null filter', function() {
        return flights.getFlight(null)
            .catch(err => {
                return expect(err instanceof errors.FlightNotFound).eql(true);
            });
    });

    it('returns flightAlreadyExist for existing value', function() {
        return flights.createFlight(body)
            .catch(err => {
                return expect(err instanceof errors.FlightAlreadyExists).eql(true);
            });
    })


});
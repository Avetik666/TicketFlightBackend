const path = process.cwd();
const Airport = require(`${path}/schemas/airports.js`);
const Flight = require(`${path}/schemas/flights.js`);
const AirportResource = require(`${path}/schemas/airport.resources.js`);
const {FlightAlreadyExists, FlightNotFound} = require(`${path}/errors/errors.js`);

async function getFlight(flightId) {
    const flight = await Flight.findByFlightId(flightId);
    if (!flight) {
        throw new FlightNotFound(flightId);
    }
    return flight;
}


async function createAirportResource(departureTerminal, departureGate, arrivalTerminal, arrivalGate, baggageClaim) {
    return new AirportResource.AirportResource({
        departureTerminal: departureTerminal,
        departureGate: departureGate,
        arrivalTerminal: arrivalTerminal,
        arrivalGate: arrivalGate,
        baggageClaim: baggageClaim
    });
}

async function createAirport(shortName, name, cityName, countryName, weatherURL) {
    return new Airport.Airport({
        shortName: shortName,
        name: name,
        cityName: cityName,
        countryName: countryName,
        weatherURL: weatherURL
    });
}

async function compare(body, flight) {

    const airportRes = body.flightStatuses[0].airportResources;
    const delay = (typeof body.flightStatuses[0].delays !== "undefined") ? body.flightStatuses[0].delays.arrivalGateDelayMinutes : 0;

    if (typeof airportRes !== "undefined" &&
        (airportRes.departureTerminal !== flight.airportResource.departureTerminal
            || airportRes.departureGate !== flight.airportResource.departureGate
            || airportRes.arrivalTerminal !== flight.airportResource.arrivalTerminal
            || airportRes.arrivalGate !== flight.airportResource.arrivalGate
            || airportRes.baggageClaim !== flight.airportResource.baggageClaim)) {
        Flight.updateOne({flightId: flight.flightId}, {$set: {'airportResource': airportRes}}, function (err) {
            if (err) throw err;
        });

    } else if (delay !== flight.delay) {
        Flight.updateOne({flightId: flight.flightId}, {$set: {'delay': delay}}, function (err) {
            if(err) throw err;
        });
    }
}

async function createFlight(body) {

    const flightId = body.flightStatuses[0].flightId;
    const flight = await Flight.findOne({flightId});

    if (flight) {
        await compare(body,flight);
        throw new FlightAlreadyExists(flightId);
    } else {
        let airportResource;
        const airportRes = body.flightStatuses[0].airportResources;
        if (typeof airportRes !== "undefined") {
            airportResource = await createAirportResource(
                airportRes.departureTerminal,
                airportRes.departureGate,
                airportRes.arrivalTerminal,
                airportRes.arrivalGate,
                airportRes.baggageClaim
            );
        } else {
            airportResource = null;
        }

        const departureAirportFsCode = body.flightStatuses[0].departureAirportFsCode;
        const depAirport = body.appendix.airports.find(x => x.fs === departureAirportFsCode);
        const departureAirport = await createAirport(
            depAirport.fs,
            depAirport.name,
            depAirport.city,
            depAirport.countryName,
            depAirport.weatherUrl
        );

        const arrivalAirportFsCode = body.flightStatuses[0].arrivalAirportFsCode;
        const arrAirport = body.appendix.airports.find(x => x.fs === arrivalAirportFsCode);
        const arrivalAirport = await createAirport(
            arrAirport.fs,
            arrAirport.name,
            arrAirport.city,
            arrAirport.countryName,
            arrAirport.weatherUrl
        );

        try {
            const airline = body.appendix.airlines.find(x => x.fs === body.request.airline.fsCode).name;

            const flight = new Flight({
                flightCode: body.request.airline.fsCode + body.flightStatuses[0].flightNumber,
                flightId: body.flightStatuses[0].flightId,
                airline: airline,
                departureDate: body.flightStatuses[0].departureDate.dateLocal,
                arrivalDate: body.flightStatuses[0].arrivalDate.dateLocal,
                departureAirport: departureAirport,
                arrivalAirport: arrivalAirport,
                airportResource: airportResource,
                delay: (typeof body.flightStatuses[0].delays !== "undefined") ? body.flightStatuses[0].delays.arrivalGateDelayMinutes : 0
            });

            await flight.save();
            return flight;
        } catch (err) {
            throw err;
        }

    }
}

module.exports = {
    createFlight,
    getFlight
};
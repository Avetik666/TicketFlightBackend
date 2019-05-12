const path = process.cwd();
const Airport = require(`${path}/schemas/airports.js`);
const Flight = require(`${path}/schemas/flights.js`);
const AirportResource = require(`${path}/schemas/airport.resources.js`);

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

async function createFlight(body) {

    const airportResource = await createAirportResource(
        body.flightStatuses[0].airportResources.departureTerminal,
        body.flightStatuses[0].airportResources.departureGate,
        body.flightStatuses[0].airportResources.arrivalTerminal,
        body.flightStatuses[0].airportResources.arrivalGate,
        body.flightStatuses[0].airportResources.baggageClaim
    );

    const departureAirportFsCode = body.flightStatuses[0].departureAirportFsCode ;
    const departureAirport = await createAirport(
        body.appendix.airports.find(x=> x.fs === departureAirportFsCode).fs,
        body.appendix.airports.find(x=> x.fs === departureAirportFsCode).name,
        body.appendix.airports.find(x=> x.fs === departureAirportFsCode).city,
        body.appendix.airports.find(x=> x.fs === departureAirportFsCode).countryName,
        body.appendix.airports.find(x=> x.fs === departureAirportFsCode).weatherUrl
    );

    const arrivalAirportFsCode = body.flightStatuses[0].arrivalAirportFsCode;
    const arrivalAirport = await createAirport(
        body.appendix.airports.find(x=> x.fs === arrivalAirportFsCode).fs,
        body.appendix.airports.find(x=> x.fs === arrivalAirportFsCode).name,
        body.appendix.airports.find(x=> x.fs === arrivalAirportFsCode).city,
        body.appendix.airports.find(x=> x.fs === arrivalAirportFsCode).countryName,
        body.appendix.airports.find(x=> x.fs === arrivalAirportFsCode).weatherUrl
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

module.exports = {
    createFlight
};
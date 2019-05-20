class FlightAlreadyExists extends Error {
    constructor(flightId) {
        super(`Flight with flightId ${flightId} already exists!`);
        this.name = "FlightAlreadyExists";
    }
}

class FlightNotFound extends Error {
    constructor(flightId) {
        super(`Flight with flightId ${flightId} wasn't found!`);
        this.name = "FlightNotFound";
    }
}

module.exports = {
    FlightAlreadyExists,
    FlightNotFound
};
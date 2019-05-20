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

class FlightDoesNotExist extends Error{
    constructor (flightNumber){
        super(`Flight with flight number ${flightNumber} does not exist! \nEnter valid flight number`);
        this.name = "FlightDoesNotExist";
    }
}

module.exports = {
    FlightAlreadyExists,
    FlightNotFound,
    FlightDoesNotExist
};
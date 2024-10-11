class BadRequestError extends Error {
    constructor(errors) {
        super("Validation failed!"); // Set a default message
        this.errors = errors; // Store validation errors
        this.status = 400; // Set HTTP status code
    }
}

class NotFoundError extends Error {
    constructor(message) {
        if (message) {
            super(message); // Set custom message if provided
        } else {
            super("Data is Not Found!"); // Default message
        }
        this.status = 404; // Set HTTP status code
    }
}

class InternalServerError extends Error {
    constructor(errors) {
        super("Internal Server Error"); // Set a default message
        this.status = 500; // Set HTTP status code
        this.errors = errors; // Store additional errors
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    InternalServerError,
};
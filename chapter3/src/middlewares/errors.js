const { NotFoundError } = require('../utils/request');

// Middleware to handle errors
exports.errorHandler = (err, req, res, next) => {
	console.error(err); // Log the error to the console

	const status = err.status || 500; // Set the status code
	const errors = err.errors || []; // Get any additional errors
	let message = err.message; // Get the error message

	// If status is 500, use a generic message for internal errors
	if (status === 500) {
		message = 'Internal Server Error';
	}

	// Return the error response in JSON format
	res.status(status).json({
		success: false,
		data: null,
		message,
		errors,
	});
};

// Middleware to handle 404 Not Found errors
exports.notFoundURLHandler = (req, res, next) => {
	throw new NotFoundError('URL Not Found!'); // Generate a NotFoundError
};
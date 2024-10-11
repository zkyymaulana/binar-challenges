require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import express framework
require('express-async-errors'); // Enable async error handling
const fileUpload = require('express-fileupload'); // Middleware for handling file uploads
const carsRouter = require('./routes'); // Import car routes
const { errorHandler, notFoundURLHandler } = require('./middlewares/errors'); // Import error handling middleware
const router = require('./routes'); // Import main router

/* Initialize express application */
const app = express();
const port = 4000;

/* Activate body parser for JSON requests */
app.use(express.json());

/* Activate file upload middleware */
app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 }, // Set file size limit to 50MB
	})
);

// Define all routes here
app.use('/', router); // Use car routes

// Middleware for handling 404 errors
app.use('*', notFoundURLHandler);

// Middleware for handling errors when API is hit
app.use(errorHandler);

/* Start the express.js application */
app.listen(port, () => {
	console.log(`The express.js app is running on port ${port}`); // Log the running port
});
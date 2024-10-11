const carService = require('../services/cars');
const { successResponse } = require('../utils/response');

// Function to get a list of cars based on query parameters
exports.getCars = (req, res, next) => {
	const { manufacture, model, capacity, type, year } = req.query;
	const data = carService.getCars(manufacture, model, capacity, type, year);
	successResponse(res, data); // Send the response with the list of cars
};

// Function to get a specific car by its ID
exports.getCarById = (req, res, next) => {
	const { id } = req.params;
	const data = carService.getCarById(id);
	successResponse(res, data); // Send the response with the car details
};

// Function to create a new car
exports.createCar = async (req, res, next) => {
	const data = await carService.createCar(req.body, req.files);
	successResponse(res, data); // Send the response with the created car details
};

// Function to update an existing car by its ID
exports.updateCar = async (req, res, next) => {
	const { id } = req.params;
	const data = await carService.updateCar(id, req.body, req.files);
	successResponse(res, data); // Send the response with the updated car details
};

// Function to delete a car by its ID
exports.deleteCarById = (req, res, next) => {
	const { id } = req.params;
	const data = carService.deleteCarById(id);
	successResponse(res, data); // Send the response confirming the deletion
};

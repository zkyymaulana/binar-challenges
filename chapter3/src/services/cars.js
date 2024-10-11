const carRepository = require('../repositories/cars'); // Import car repository
const { imageUpload } = require('../utils/image-kit'); // Import image upload function
const { NotFoundError, InternalServerError } = require('../utils/request'); // Import error classes
const { v4: uuidv4 } = require('uuid'); // Import UUID

// Function to get a list of cars based on filters
exports.getCars = (make, model, capacity, type, year) => {
	return carRepository.getCars(make, model, capacity, type, year); // Get the list of cars based on filters
};

// Function to get a car by its ID
exports.getCarById = id => {
	const car = carRepository.getCarById(id); // Get the car by ID

	if (!car) {
		throw new NotFoundError('Car is Not Found!'); // Throw an error if the car is not found
	}

	return car; // Return the found car
};

// Function to create a new car
exports.createCar = async (data, files) => {
	// Upload image file if present
	if (files && files.image) {
		const uploadedImageUrl = await imageUpload(files.image); // Save the uploaded image URL
		data.image = uploadedImageUrl; // Add the image URL to the car data
	}

	// Add UUID ID
	data.id = uuidv4(); // Generate a new UUID

	// Create the new car data
	return carRepository.createCar(data); // Return the created car
};

// Function to update an existing car
exports.updateCar = async (id, data, files) => {
	console.log('Updating car with ID:', id); // Log the ID being updated
	const existingCar = carRepository.getCarById(id);
	if (!existingCar) {
		throw new NotFoundError('Car is Not Found!'); // Throw an error if the car is not found
	}

	// If an image file is uploaded
	if (files && files.image) {
		const uploadedImageUrl = await imageUpload(files.image); // Upload the new image
		data.image = uploadedImageUrl; // Save the uploaded image URL
	} else {
		data.image = existingCar.image; // Keep the existing image if no new image is uploaded
	}

	// Update the car data
	const updatedCar = carRepository.updateCar(id, { ...existingCar, ...data });
	if (!updatedCar) {
		throw new InternalServerError(['Failed to update car!']); // Throw an error if update fails
	}

	return updatedCar; // Return the updated car
};

// Function to delete a car by its ID
exports.deleteCarById = id => {
	// Check if the car exists
	const existingCar = carRepository.getCarById(id);
	if (!existingCar) {
		throw new NotFoundError('Car is Not Found!'); // Throw an error if the car is not found
	}

	// If it exists, delete the car data
	const deletedCar = carRepository.deleteCarById(id);
	if (!deletedCar) {
		throw new InternalServerError(['Failed to delete car!']); // Throw an error if deletion fails
	}

	return deletedCar; // Return the deleted car
};
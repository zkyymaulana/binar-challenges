const fs = require('fs');
const cars = require('../../data/cars.json'); // Import car data from JSON file
const { NotFoundError } = require('../utils/request'); // Import NotFoundError class

// Function to get a list of cars based on provided filters
exports.getCars = (manufacture, model, capacity, type, year) => {
	const searchedCars = cars.filter(car => {
		// Perform filtering logic
		let result = true;
		if (manufacture) {
			const isFoundManufacture = car.manufacture.toLowerCase().includes(manufacture.toLowerCase());
			result = result && isFoundManufacture; // Ensure this is true
		}
		if (model) {
			const isFoundModel = car.model.toLowerCase().includes(model.toLowerCase());
			result = result && isFoundModel; // Ensure this is true
		}
		if (capacity) {
			const isFoundCapacity = car.capacity === capacity; // Compare capacity
			result = result && isFoundCapacity; // Ensure this is true
		}
		if (type) {
			const isFoundType = car.type.toLowerCase().includes(type.toLowerCase()); // Compare type
			result = result && isFoundType; // Ensure this is true
		}
		if (year) {
			const isFoundYear = car.year === year; // Compare year as a number
			result = result && isFoundYear; // Ensure this is true
		}

		return result; // Return the final result of the filtering
	});
	return searchedCars; // Return the filtered list of cars
};

// Function to get a car by its ID
exports.getCarById = id => {
	console.log('Searching for car with ID:', id); // Log the ID being searched
	const car = cars.find(car => car.id === id); // Use UUID ID to find the car
	console.log('Found car:', car); // Log the found car
	return car; // Return the found car
};

// Function to create a new car
exports.createCar = data => {
	// Add the new car data to the current array of cars
	cars.push(data); // Use data that already has a UUID ID

	// Save the updated data to the JSON file
	fs.writeFileSync('./data/cars.json', JSON.stringify(cars, null, 4), 'utf-8');

	return data; // Return the newly created car data
};

// Function to update car information
exports.updateCar = (id, data) => {
	// Find the index of the car based on ID
	const carIndex = cars.findIndex(car => car.id === id); // Ensure using UUID ID
	if (carIndex < 0) {
		throw new NotFoundError('Car is Not Found!'); // Throw an error if the car is not found
	}

	// Update the car data
	cars[carIndex] = { ...cars[carIndex], ...data }; // Merge existing data with new data

	// Save the updated data to the JSON file
	fs.writeFileSync('./data/cars.json', JSON.stringify(cars, null, 4), 'utf-8');

	return cars[carIndex]; // Return the updated car
};

// Function to delete a car by its ID
exports.deleteCarById = id => {
	// Find the index of the car
	const carIndex = cars.findIndex(car => car.id === id); // Ensure using UUID ID

	if (carIndex < 0) {
		// If no index is found
		return null; // Return null if the car is not found
	}

	const deletedCar = cars.splice(carIndex, 1); // Remove the car from the array

	// Save the updated data to the JSON file
	fs.writeFileSync('./data/cars.json', JSON.stringify(cars, null, 4), 'utf-8');
	return deletedCar; // Return the deleted car
};
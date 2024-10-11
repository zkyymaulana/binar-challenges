const express = require('express');
const { validateGetCars, validateGetCarById, validateCreateCar, validateUpdateCar, validateDeleteCarById } = require('../middlewares/cars');
const { getCars, getCarById, createCar, updateCar, deleteCarById } = require('../controllers/cars');

const router = express.Router();

// Define routes for cars
router.route('/').get(validateGetCars, getCars).post(validateCreateCar, createCar); // GET and POST for cars

router.route('/:id').get(validateGetCarById, getCarById).put(validateUpdateCar, updateCar).delete(validateDeleteCarById, deleteCarById); // GET, PUT, DELETE for specific car by ID

module.exports = router; // Export the router
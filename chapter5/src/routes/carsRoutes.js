const express = require('express');
const { authorization } = require('../middlewares/auth');

const { validateGetCars, validateGetCarById, validateCreateCar, validateUpdateCar, validateDeleteCar } = require('../middlewares/carsMiddlewares');

const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carsControllers');
const { adminRole, userRole } = require('../constants/auth');

const router = express.Router();

router.route('/').get(authorization(adminRole, userRole), validateGetCars, getAllCars).post(authorization(adminRole), validateCreateCar, createCar);

router.route('/:id').get(authorization(adminRole, userRole), validateGetCarById, getCarById).put(authorization(adminRole), validateUpdateCar, updateCar).delete(authorization(adminRole), validateDeleteCar, deleteCar);

module.exports = router;

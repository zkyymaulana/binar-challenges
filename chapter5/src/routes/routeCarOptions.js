const express = require('express');
const { authorization } = require('../middlewares/auth');
const { validateGetCarOptions, validateGetCarOptionById, validateCreateCarOption, validateUpdateCarOption, validateDeleteCarOptionById } = require('../middlewares/carOptions');
const { getCarOptions, getCarOptionById, createCarOption, updateCarOption, deleteCarOptionById } = require('../controllers/carOptions');
const { adminRole, userRole } = require('../constants/auth');

const router = express.Router();

router.route('/').get(authorization(adminRole, userRole), validateGetCarOptions, getCarOptions).post(authorization(adminRole), validateCreateCarOption, createCarOption);

router
	.route('/:id')
	.get(authorization(adminRole, userRole), validateGetCarOptionById, getCarOptionById)
	.put(authorization(adminRole), validateUpdateCarOption, updateCarOption)
	.delete(authorization(adminRole), validateDeleteCarOptionById, deleteCarOptionById);

module.exports = router;

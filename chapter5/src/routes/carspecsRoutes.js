const express = require('express');
const { authorization } = require('../middlewares/auth');
const { adminRole, userRole } = require('../constants/auth');

const { validateGetCarSpecs, validateGetCarSpecsById, validateCreateCarSpecs, validateDeleteCarSpecs, validateUpdateCarSpecs } = require('../middlewares/carspecsMiddlewares');

const { getAllCarSpecs, getCarSpecsById, createCarSpecs, deleteCarSpecs, updateCarSpecs } = require('../controllers/carspecsControllers');

const router = express.Router();

router.route('/').get(authorization(adminRole, userRole), validateGetCarSpecs, getAllCarSpecs).post(authorization(adminRole), validateCreateCarSpecs, createCarSpecs);

router
	.route('/:id')
	.get(authorization(adminRole, userRole), validateGetCarSpecsById, getCarSpecsById)
	.delete(authorization(adminRole), validateDeleteCarSpecs, deleteCarSpecs)
	.put(authorization(adminRole), validateUpdateCarSpecs, updateCarSpecs);

module.exports = router;

const express = require('express');
const { authorization } = require('../middlewares/auth');
const { adminRole, userRole } = require('../constants/auth');

const { validateGetTypes, validateGetTypeById, validateCreateType, validateUpdateType, validateDeleteTypeById } = require('../middlewares/type');

const { getTypes, getTypeById, createType, updateType, deleteTypeById } = require('../controllers/type');

const router = express.Router();

router.route('/').get(authorization(adminRole, userRole), validateGetTypes, getTypes).post(authorization(adminRole), validateCreateType, createType);

router.route('/:id').get(authorization(adminRole, userRole), validateGetTypeById, getTypeById).put(authorization(adminRole), validateUpdateType, updateType).delete(authorization(adminRole), validateDeleteTypeById, deleteTypeById);

module.exports = router;

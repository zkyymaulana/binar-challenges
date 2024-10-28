const express = require('express');
const { authorization } = require('../middlewares/auth');
const { validateGetTransmissions, validateGetTransmissionById, validateDeleteTransmissionById, validateCreateTransmission, validateUpdateTransmission } = require('../middlewares/transmission');
const { getTransmissions, getTransmissionById, deleteTransmissionById, createTransmission, updateTransmission } = require('../controllers/transmission');
const { adminRole, userRole } = require('../constants/auth');

const router = express.Router();

// Rute untuk mendapatkan semua transmisi dan membuat transmisi baru
router.route('/').get(authorization(adminRole, userRole), validateGetTransmissions, getTransmissions).post(authorization(adminRole), validateCreateTransmission, createTransmission);

// Rute untuk mendapatkan, memperbarui, dan menghapus transmisi berdasarkan ID
router
	.route('/:id')
	.get(authorization(adminRole, userRole), validateGetTransmissionById, getTransmissionById)
	.put(authorization(adminRole), validateUpdateTransmission, updateTransmission)
	.delete(authorization(adminRole), validateDeleteTransmissionById, deleteTransmissionById);

module.exports = router;

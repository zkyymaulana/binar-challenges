const express = require('express');
const { authorization } = require('../middlewares/auth');
const { adminRole, userRole } = require('../constants/auth');

const { validateGetSpecs } = require('../middlewares/specsMiddlewares');

const {
	getAllSpecs,
	// createSpecs
} = require('../controllers/specsControllers');

const router = express.Router();

router.route('/').get(authorization(adminRole, userRole), validateGetSpecs, getAllSpecs);

router.route('/');

module.exports = router;

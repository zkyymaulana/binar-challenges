const express = require('express');
const { authorization } = require('../middlewares/auth');
const { validateGetOptions } = require('../middlewares/options');
const { getOptions } = require('../controllers/options');
const { adminRole, userRole } = require('../constants/auth');

const router = express.Router();

router.route('/').get(authorization(adminRole, userRole), validateGetOptions, getOptions);

module.exports = router;

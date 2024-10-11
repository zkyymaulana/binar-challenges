const express = require('express');
const carsRouter = require('./cars');

const router = express.Router();

// Use the cars router for all routes starting with /cars
router.use('/cars', carsRouter);

module.exports = router;
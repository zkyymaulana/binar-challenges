const { z } = require('zod');
const { BadRequestError } = require('../utils/request');

// Middleware for validating query parameters for getting car list
exports.validateGetCars = (req, res, next) => {
	// Convert query parameters to numbers if applicable
	if (req.query.capacity) {
		req.query.capacity = Number(req.query.capacity);
	}
	if (req.query.year) {
		req.query.year = Number(req.query.year);
	}

	// Define the expected query parameters
	const validateQuery = z.object({
		manufacture: z.string().optional(),
		model: z.string().optional(),
		capacity: z.number().positive().optional(),
		type: z.string().optional(),
		year: z.number().optional(),
	});

	// Validate the query parameters
	const result = validateQuery.safeParse(req.query);
	if (!result.success) {
		return res.status(400).json({
			success: false,
			message: 'Invalid query parameters',
			errors: result.error.errors,
		});
	}

	next(); // Proceed to the next middleware
};

// Middleware for validating parameters for getting a car by ID
exports.validateGetCarById = (req, res, next) => {
	// Define the expected parameters
	const validateParams = z.object({
		id: z.string(),
	});

	// Validate the parameters
	const result = validateParams.safeParse(req.params);
	if (!result.success) {
		throw new BadRequestError(result.error.errors); // Throw an error if validation fails
	}

	next(); // Proceed to the next middleware
};

// Middleware for validating request body when creating a new car
exports.validateCreateCar = (req, res, next) => {
	// Convert fields to appropriate types
	if (req.body.capacity) {
		req.body.capacity = Number(req.body.capacity);
	}
	if (req.body.year) {
		req.body.year = Number(req.body.year);
	}
	if (req.body.rentPerDay) {
		req.body.rentPerDay = Number(req.body.rentPerDay);
	}
	if (req.body.available) {
		req.body.available = req.body.available === 'true'; // Convert to boolean
	}

	// Convert options and specs from string to array
	if (typeof req.body.options === 'string') {
		req.body.options = req.body.options.split(',').map(option => option.trim());
	}
	if (typeof req.body.specs === 'string') {
		req.body.specs = req.body.specs.split(',').map(spec => spec.trim());
	}

	// Define the expected body structure
	const validateBody = z.object({
		plate: z.string().optional(),
		manufacture: z.string().optional(),
		model: z.string().optional(),
		rentPerDay: z.number().positive().optional(),
		capacity: z.number().positive().optional(),
		description: z.string().optional(),
		availableAt: z.string().optional(),
		transmission: z.string().optional(),
		available: z.boolean().optional(),
		type: z.string().optional(),
		year: z.number().int().gte(1886).lte(new Date().getFullYear()).optional(),
		options: z.array(z.string()).optional(),
		specs: z.array(z.string()).optional(),
	});

	// Validate file structure
	const validateFileBody = z
		.object({
			image: z
				.object({
					name: z.string(),
					data: z.any(),
				})
				.nullable()
				.optional(),
		})
		.nullable()
		.optional();

	// Validate the request body
	const result = validateBody.safeParse(req.body);
	if (!result.success) {
		throw new BadRequestError(result.error.errors); // Throw an error if validation fails
	}

	const resultValidateFiles = validateFileBody.safeParse(req.files);
	if (!resultValidateFiles.success) {
		throw new BadRequestError(resultValidateFiles.error.errors); // Throw an error if file validation fails
	}

	next(); // Proceed to the next middleware
};

// Middleware for validating request body when updating a car
exports.validateUpdateCar = async (req, res, next) => {
	const validateParams = z.object({
		id: z.string(),
	});

	// Convert fields to appropriate types
	if (req.body.capacity) {
		req.body.capacity = Number(req.body.capacity);
	}
	if (req.body.year) {
		req.body.year = Number(req.body.year);
	}
	if (req.body.rentPerDay) {
		req.body.rentPerDay = Number(req.body.rentPerDay);
	}
	if (req.body.available) {
		req.body.available = req.body.available === 'true'; // Convert to boolean
	}

	// Convert options and specs from string to array
	if (typeof req.body.options === 'string') {
		req.body.options = req.body.options.split(',').map(option => option.trim());
	}
	if (typeof req.body.specs === 'string') {
		req.body.specs = req.body.specs.split(',').map(spec => spec.trim());
	}

	// Validate the ID parameter
	const resultValidateParams = validateParams.safeParse(req.params);
	if (!resultValidateParams.success) {
		throw new BadRequestError(resultValidateParams.error.errors); // Throw an error if validation fails
	}

	const carId = req.params.id;

	// Define the expected body structure
	const validateBody = z.object({
		plate: z.string().optional(),
		manufacture: z.string().optional(),
		model: z.string().optional(),
		rentPerDay: z.number().positive().optional(),
		capacity: z.number().positive().optional(),
		description: z.string().optional(),
		availableAt: z.string().optional(),
		transmission: z.string().optional(),
		available: z.boolean().optional(),
		type: z.string().optional(),
		year: z.number().int().gte(1886).lte(new Date().getFullYear()).optional(),
		options: z.array(z.string()).optional(),
		specs: z.array(z.string()).optional(),
	});

	// Validate file structure
	const validateFileBody = z
		.object({
			image: z
				.object({
					name: z.string(),
					data: z.any(),
				})
				.nullable()
				.optional(),
		})
		.nullable()
		.optional();

	// Validate the request body
	const result = validateBody.safeParse(req.body);
	if (!result.success) {
		throw new BadRequestError(result.error.errors); // Throw an error if validation fails
	}

	const resultValidateFiles = validateFileBody.safeParse(req.files);
	if (!resultValidateFiles.success) {
		throw new BadRequestError(resultValidateFiles.error.errors);
	}

	// Konversi year dan rentPerDay jika ada di body
	if (req.body.year) {
		req.body.year = Number(req.body.year);
	}
	if (req.body.rentPerDay) {
		req.body.rentPerDay = Number(req.body.rentPerDay);
	}

	const resultValidateBody = validateBody.safeParse(req.body);
	if (!resultValidateBody.success) {
		return res.status(400).json({
			success: false,
			message: 'Validation failed!',
			errors: resultValidateBody.error.errors,
		});
	}

	next(); // Proceed to the next middleware
};

// Middleware for validating parameters when deleting a car by ID
exports.validateDeleteCarById = (req, res, next) => {
	const validateParams = z.object({
		id: z.string(),
	});

	// Validate the ID parameter
	const result = validateParams.safeParse(req.params);
	if (!result.success) {
		throw new BadRequestError(result.error.errors); // Throw an error if validation fails
	}

	next();
};
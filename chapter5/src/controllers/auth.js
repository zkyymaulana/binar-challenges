const authService = require('../services/auth');
const { SuccessResponse } = require('../utils/response');

exports.register = async (req, res, next) => {
	const data = await authService.register(req.body, req.files);
	SuccessResponse(res, data);
};

exports.login = async (req, res, next) => {
	const data = await authService.login(req.body.email, req.body.password);
	SuccessResponse(res, data);
};

exports.getProfile = async (req, res, next) => {
	const data = req.user;

	// remove the password object
	delete data.password;

	SuccessResponse(res, data);
};

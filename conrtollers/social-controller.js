const CATCH_ASYNC_ERROR = require('../error_handler/catch-async-errors');
const SOCILAS = require('../schema/socials-schema');

// * CREATE SOCILA ACCOUNT
exports.CREATE_SOCIAL = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const profile = await SOCILAS.create(req.body);
	return res.status(201).json({
		status: 'success',
		data: profile,
	});
});

// * GET SOCIAL
exports.GET_SOCIALS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const profiles = await SOCILAS.find();

	return res.status(200).json({
		status: 'success',
		data: profiles,
	});
});

// * DELTE SOCIAL
exports.DELETE_SOCIALS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	await SOCILAS.findByIdAndDelete(req.params.id);

	return res.status(200).json({
		status: 'success',
		data: null,
	});
});

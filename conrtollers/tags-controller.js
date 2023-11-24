const APP_ERROR = require('../error_handler/app-error');
const CATCH_ASYNC_ERROR = require('../error_handler/catch-async-errors');
const TAGS = require('../schema/tags-schema');

exports.CREATE_TAGS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	if (!req.body) return next(new APP_ERROR('Please insert tags', 400));
	const tags = await TAGS.create(req.body);
	res.status(201).json({
		status: 'success',
		data: tags,
	});
});

//* GET ALL TAGS
exports.GET_TAGS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const tags = await TAGS.find();
	res.status(200).json({
		status: 'success',
		data: tags,
	});
});

// * DELETE TAGS
exports.DELETE_TAG = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const tags = await TAGS.findByIdAndDelete(req.params.id);
	if (!tags) return next(new APP_ERROR('tag not found', 404));
	res.status(200).json({
		status: 'success',
		data: null,
	});
});

const APP_ERROR = require('../error_handler/app-error');
const CATCH_ASYNC_ERROR = require('../error_handler/catch-async-errors');
const MODULES = require('../schema/module.schema');
const BLOGS = require('../schema/blogs-schema');
const TOPICS = require('../schema/topics-schema');

// * CREATE MODULE
exports.CREATE_MODULE = CATCH_ASYNC_ERROR(async (req, res, next) => {
	if (!req.body) return next(new APP_ERROR('Please enter data', 400));
	const module = await MODULES.create(req.body);

	res.status(201).json({
		message: 'success',
		data: module,
	});
});

//* GET MODULES LISTS ALONG WITH ARTICLES
exports.GET_MODULES = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const module = await MODULES.find();

	let dataa = module.map((mod) => {
		return mod.articles;
	});

	console.log(dataa);
	res.status(200).json({
		status: 'success',
		data: module,
	});
});

//* GET MODULE DETAILS
exports.MODULE_DETAILS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const module = await MODULES.findById(req.params.id).populate({
		path: 'articles',
	});
	if (!module) return next(new APP_ERROR('No Module Find', 404));

	res.status(200).json({
		status: 'success',
		data: module,
	});
});

//* DELETE MODULE
exports.DELETE_MODULE = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const module = await MODULES.findById(req.params.id);
	if (!module) return next(new APP_ERROR('No module found', 404));
	await MODULES.findByIdAndDelete(req.params.id);

	// REMOVE FROM TOPIC's ARRAY
	const topics = await TOPICS.find();
	for (const topic of topics) {
		topic.modules = topic.modules.filter(
			(topicModule) => topicModule.toString() !== req.params.id,
		);

		// Save the updated topic
		await topic.save();
	}

	// Send Response
	return res.status(200).json({
		status: 'success',
		data: null,
	});
});

//* REMOVE ARTICLE FROM THE MODULE
exports.REMOVE_ARTICLE = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const { m_id, a_id } = req.params;
	const module = await MODULES.findById(m_id);
	const article = await BLOGS.findById(a_id);

	if (!module) return next(new APP_ERROR('No Module Find', 404));
	if (!article) return next(new APP_ERROR('No Artilce Find', 404));

	module.articles = module.articles.filter(
		(art) => art._id.toString() !== a_id.toString(),
	);

	await module.save();

	res.status(201).json({
		status: 'success',
		data: module,
	});
});

//* ADD MODULE TO TOPIC
exports.MODULE_TO_TOPIC = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const module = await MODULES.findById(req.params.id);
	const topic = await TOPICS.findById(req.body.id);

	let already = topic.modules.find(
		(mod) => mod._id.toHexString() === module._id.toHexString(),
	);

	if (already) return next(new APP_ERROR('Duplicated Data', 400));

	topic.modules.push(module._id);

	await topic.save();

	res.status(201).json({
		status: 'success',
		data: topic,
	});
});

// * UPDATE MODULE NAME
exports.UPDATE_MODULE = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const module = await MODULES.findById(req.params.id);

	if (!module) return next(new APP_ERROR('No module dound.', 404));

	const options = {
		new: true,
		runValidators: true,
	};

	const updated_module = await MODULES.findByIdAndUpdate(
		req.params.id,
		req.body,
		options,
	);

	res.status(201).json({
		status: 'success',
		data: updated_module,
	});
});

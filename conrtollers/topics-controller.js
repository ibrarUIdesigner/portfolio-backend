const CATCH_ASYNC_ERROR = require('../error_handler/catch-async-errors');
const TOPICS = require('../schema/topics-schema');
const APP_ERROR = require('../error_handler/app-error');
const BLOGS = require('../schema/blogs-schema');
const MODULES = require('../schema/module.schema');

//* CREATE NEW TOPIC
exports.CREATE_TOPIC = CATCH_ASYNC_ERROR(async (req, res, next) => {
	if (!req.body) return next(new APP_ERROR('Please insert data', 400));
	const topic = await TOPICS.create(req.body);

	res.status(201).json({
		status: 'success',
		data: topic,
	});
});

// * GET ALL TOPICS
exports.GET_TOPICS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const topics = await TOPICS.find().populate({
		path: 'modules',
	});

	res.status(200).json({
		status: 'success',
		data: topics,
	});
});

// Function to calculate reading time
function calculateReadingTime(text) {
	const wordsPerMinute = 225; // Average reading speed in words per minute
	const wordCount = text.split(/\s+/).length;
	const readingTime = Math.ceil(wordCount / wordsPerMinute);
	console.log(readingTime);
	return readingTime;
}

//* GET SINGLE TOPIC WITH ARTICLES LIST
exports.TOPIC_DETAILS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const topic = await TOPICS.findById(req.params.id).populate({
		path: 'modules',
		populate: { path: 'articles' },
	});
	if (!topic) return next(new APP_ERROR('No Topc Found with this id', 404));

	// Calculate reading time for each article
	topic.modules.forEach((module) => {
		module.articles.map((article) => {
			article.readingTime = calculateReadingTime(article.details);
		});
	});

	res.status(200).json({
		status: 'success',
		data: topic,
	});
});

// * DELETE TOPIC
exports.DELETE_TOPIC = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const topic = await TOPICS.findById(req.params.id);

	if (!topic) return next(new APP_ERROR('No Topic Found', 404));

	await TOPICS.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: 'success',
		data: null,
	});
});

//* UPDATE TOPIC
exports.UPDATE_TOPIC = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const topic = await TOPICS.findById(req.params.id);

	if (!topic) return next(new APP_ERROR('No Topic Found', 404));

	const options = {
		new: true,
		runValidators: true,
	};

	const updated_topic = await TOPICS.findByIdAndUpdate(
		req.params.id,
		req.body,
		options,
	);
	res.status(201).json({
		status: 'success',
		data: updated_topic,
	});
});

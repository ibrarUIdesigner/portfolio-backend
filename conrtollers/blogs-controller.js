const CATCH_ASYNC_ERROR = require('../error_handler/catch-async-errors');
const BLOGS = require('../schema/blogs-schema');
const APP_ERROR = require('../error_handler/app-error');

const fs = require('fs');
const path = require('path');
const MODULES = require('../schema/module.schema');

//* CREATE BLOGS
exports.CREATE_BLOG = CATCH_ASYNC_ERROR(async (req, res, next) => {
	if (!req.file) return next(new APP_ERROR('No file uploaded.', 400));

	const payload = {
		title: req.body.title,
		description: req.body.description,
		details: req.body.details,
		category: req.body.category,
		tags: JSON.parse(req.body.tags),
		blog_snaps: req.file.filename,
	};

	const BLOG = await BLOGS.create(payload);

	return res.status(201).json({
		status: 'success',
		data: BLOG,
	});
});

// Function to calculate reading time
function calculateReadingTime(text) {
	const wordsPerMinute = 225; // Average reading speed in words per minute
	const wordCount = text.split(/\s+/).length;
	const readingTime = Math.ceil(wordCount / wordsPerMinute);
	return readingTime;
}

//* GET ALL BLOGS
exports.GET_BLOGGS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const blogs = await BLOGS.find();
	const blogsWithReadingTime = blogs.map((blog) => ({
		...blog._doc,
		readingTime: calculateReadingTime(blog.details),
	}));

	return res.status(200).json({
		status: 'success',
		result: blogs.length,
		data: blogsWithReadingTime,
	});
});

//* GET BLOG DETAILS
exports.GET_BLOG_DETAILS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const blog = await BLOGS.findById(req.params.id);
	if (!blog) return next(new APP_ERROR('Not Found', 404));
	const readingTime = await calculateReadingTime(blog.details);

	const updatedBlog = {
		...blog.toObject(),
		readingTime,
	};

	return res.status(200).json({
		status: 'success',
		data: updatedBlog,
	});
});

// * UPDATE BLOG  VIEWS
exports.UPDATE_VIEWS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const blog = await BLOGS.findById(req.params.id);
	if (!blog) return next(new APP_ERROR('Not Found', 404));

	let count = blog.views;
	count++;
	const payload = {
		views: count,
	};

	const updatedView = await BLOGS.findByIdAndUpdate(req.params.id, payload, {
		new: true,
		runValidators: true,
	});

	return res.status(200).json({
		status: 'success',
		data: updatedView.views,
	});
});

// * GET TOP 10 BLOGS BY VIEWS
exports.GET_TOP_BLOGS = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const topBlogs = await BLOGS.find().sort({ views: -1 }).limit(10);

	res.status(200).json({
		status: 'success',
		data: topBlogs,
	});
});

//* UNLINKING IMAGE
const UnlikingAnImage = (image) => {
	console.log('image is unlinking', image);

	// SNAP NAME
	const imageFileName = image;

	// Construct the full path to the image file
	const imagePath = path.join(__dirname, '../public', 'uploads', imageFileName);

	// Check if the image file exists and then delete it
	if (fs.existsSync(imagePath)) {
		try {
			console.log(imagePath);
			fs.unlinkSync(imagePath);
		} catch (error) {
			console.error(`Error deleting image: ${error}`);
			return next(new APP_ERROR(`Error deleting image: ${error}`, 400));
		}
	}
};

// * UPDATE BLOG
exports.UODATE_BLOG = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const blog = await BLOGS.findById(req.params.id);
	if (!blog) return next(new APP_ERROR('Not Found', 404));
	const payload = {
		title: req.body.title,
		description: req.body.description,
		details: req.body.details,
		category: req.body.category,
	};
	if (req.file) {
		payload.blog_snaps = req.file.filename;
		UnlikingAnImage(blog.blog_snaps);
	}

	const update_blog = await BLOGS.findByIdAndUpdate(req.params.id, payload, {
		new: true,
		runValidators: true,
	});
	return res.status(201).json({
		status: 'success',
		data: update_blog,
	});
});

// * DELETE BLOGS
exports.DELETE_BLOG = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const blog = await BLOGS.findById(req.params.id);
	if (!blog) return next(new APP_ERROR('Not Found', 404));
	await BLOGS.findByIdAndDelete(req.params.id);

	// Find the module that contains the article and remove the article ID
	const modules = await MODULES.find({ articles: req.params.id });

	for (const module of modules) {
		module.articles = module.articles.filter(
			(articleId) => articleId.toString() !== req.params.id,
		);
		await module.save();
	}

	UnlikingAnImage(blog.blog_snaps);

	// Send Response
	return res.status(200).json({
		status: 'success',
		data: null,
	});
});

// * SHIFT ARTILCES TO MODULES
exports.SHIFT_ARTICLE_TO_MODULES = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const module = await MODULES.findById(req.body.id);
	const article = await BLOGS.findById(req.params.id);
	//  check if article is already added
	const already = module.articles.find((art) => {
		return art._id.toHexString() === article._id.toHexString();
	});
	if (already)
		return next(new APP_ERROR('this artilce is already in this module', 400));
	if (!module) return next(new APP_ERROR('Module Not Found', 404));
	module.articles.push(article._id);

	await module.save();

	res.status(201).json({
		status: 'success',
		data: module,
	});
});

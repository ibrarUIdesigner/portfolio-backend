const Projects = require('../schema/projects-schema');
const CATCH_ASYNC_ERRORS = require('../error_handler/catch-async-errors');
const APP_ERROR = require('../error_handler/app-error');
const fs = require('fs');
const path = require('path');

exports.CHECK_CREATE_PROJECT = (req, res, next) => {
	if (Object.keys(req.body).length <= 0) {
		return res.status(400).json({
			status: 'fails',
			message: 'Please enter ther valid details',
		});
	}

	next();
};

//* GET ALL PROJECTS
exports.GET_PROJECTS = CATCH_ASYNC_ERRORS(async (req, res) => {
	const data = await Projects.find();
	const results = data.length;

	return res.status(200).json({
		status: 'success',
		results,
		data,
	});
});

//* CREATE PROJECT
exports.CREATE_PROJECT = CATCH_ASYNC_ERRORS(async (req, res, next) => {
	if (!req.file) {
		return next(new APP_ERROR('No file uploaded.', 400));
	}

	const payload = {
		title: req.body.title,
		description: req.body.description,
		url: req.body.url,
		snaps: req.file.filename,
	};

	const Blog = await Projects.create(payload);

	return res.status(201).json({
		status: 'success',
		data: Blog,
	});
});

// * GET SINGLE PROJECT
exports.PROJECT_DETAILS = CATCH_ASYNC_ERRORS(async (req, res, next) => {
	const BLOG = await Projects.findById(req.params.id);

	if (!BLOG) return next(new APP_ERROR('No Data is Found', 404));

	res.status(200).json({
		status: 'success',
		data: BLOG,
	});
});

// * UPDATE PROJECT
exports.UPDATE_PROJECT = CATCH_ASYNC_ERRORS(async (req, res) => {
	const project = await Projects.findById(req.params.id);
	if (!project) {
		return next(new APP_ERROR('No Data is Found', 404));
	}
	const payload = {
		title: req.body.title,
		description: req.body.description,
		url: req.body.url,
	};
	if (req.file) {
		payload.snaps = req.file.filename;
		UnlikingAnImage(project.snaps);
	}

	const updatedProject = await Projects.findByIdAndUpdate(
		req.params.id,
		payload,
		{
			new: true,
			runValidators: true,
		},
	);

	res.status(200).json({
		status: 'success',
		data: updatedProject,
	});
});

// * DELETE PROJECT
exports.DELETE_PROJECT = CATCH_ASYNC_ERRORS(async (req, res) => {
	const project = await Projects.findById(req.params.id);
	const blog = await Projects.findByIdAndDelete(req.params.id);
	if (!blog) {
		return next(new APP_ERROR('No Data is Found', 404));
	}

	UnlikingAnImage(project.snaps);

	// Send Response
	res.status(200).json({
		status: 'success',
		data: null,
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

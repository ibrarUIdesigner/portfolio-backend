const CATCH_ASYNC_ERROR = require('../error_handler/catch-async-errors');
const BLOGS = require('../schema/blogs-schema');
const PROJECTS = require('../schema/projects-schema');

exports.dashboardAnalytics = CATCH_ASYNC_ERROR(async (req, res, next) => {
	const blogs = (await BLOGS.countDocuments()) || 0;
	const projects = (await PROJECTS.countDocuments()) || 0;

	

	const data = [
		{ count: projects, schema: 'Projects', icon: 'bi-cast' },
		{ count: blogs, schema: 'Blogs', icon: 'bi-credit-card-2-front' },
		{ count: 10, schema: 'Users', icon: 'bi-person-badge' },
		{ count: 20, schema: 'Writer', icon: 'bi-speedometer' },
	];

	return res.status(200).json({
		status: 'success',

		data,
	});
});

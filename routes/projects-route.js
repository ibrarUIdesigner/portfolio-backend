const express = require('express');
const router = express.Router();

const {
	GET_PROJECTS,
	CREATE_PROJECT,
	PROJECT_DETAILS,
	UPDATE_PROJECT,
	DELETE_PROJECT,

	CHECK_CREATE_PROJECT,
} = require('../conrtollers/projects-controller');

const upload = require('../middleware/file-upload');
const CHECK_ID = require('../middleware/check-paramId');
const { dashboardAnalytics } = require('../conrtollers/dashboard.controller');

router.param('id', CHECK_ID);

router
	.route('/posts')
	.get(GET_PROJECTS)
	.post(upload.single('snaps'), CREATE_PROJECT);

router
	.route('/posts/:id')
	.get(PROJECT_DETAILS)
	.put(upload.single('snaps'), UPDATE_PROJECT)
	.delete(DELETE_PROJECT);

router.route('/analytics').get(dashboardAnalytics);

module.exports = router;

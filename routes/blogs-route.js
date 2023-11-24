const express = require('express');
const {
	CREATE_BLOG,
	GET_BLOGGS,
	GET_BLOG_DETAILS,
	DELETE_BLOG,
	UPDATE_VIEWS,
	UODATE_BLOG,
	GET_TOP_BLOGS,
	SHIFT_ARTICLE_TO_MODULES,
} = require('../conrtollers/blogs-controller');
const upload = require('../middleware/file-upload');
const router = express.Router();

const CHECK_ID = require('../middleware/check-paramId');

router.param('id', CHECK_ID);

router
	.route('/blogs')
	.get(GET_BLOGGS)
	.post(upload.single('blog_snaps'), CREATE_BLOG);

router
	.route('/blogs/:id')
	.get(GET_BLOG_DETAILS)
	.delete(DELETE_BLOG)
	.put(upload.single('blog_snaps'), UODATE_BLOG);
router.route('/blogs/update-views/:id').get(UPDATE_VIEWS);
router.route('/top-blogs').get(GET_TOP_BLOGS);
router.route('/article-to-module/:id').post(SHIFT_ARTICLE_TO_MODULES);

module.exports = router;

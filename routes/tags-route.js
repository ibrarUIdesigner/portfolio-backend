const express = require('express');
const {
	GET_TAGS,
	CREATE_TAGS,
	DELETE_TAG,
} = require('../conrtollers/tags-controller');
const router = express.Router();

router.route('/tags').get(GET_TAGS).post(CREATE_TAGS);
router.route('/tags/:id').delete(DELETE_TAG);

module.exports = router;

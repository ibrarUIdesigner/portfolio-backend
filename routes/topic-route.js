const express = require('express');
const {
	CREATE_TOPIC,
	GET_TOPICS,
	TOPIC_DETAILS,
	DELETE_TOPIC,
	UPDATE_TOPIC,
} = require('../conrtollers/topics-controller');

const router = express.Router();

router.route('/topics').post(CREATE_TOPIC).get(GET_TOPICS);
router
	.route('/topics/:id')
	.get(TOPIC_DETAILS)
	.delete(DELETE_TOPIC)
	.put(UPDATE_TOPIC);

module.exports = router;

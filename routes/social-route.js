const express = require('express');
const {
	CREATE_SOCIAL,
	GET_SOCIALS,
	DELETE_SOCIALS,
} = require('../conrtollers/social-controller');
const CHECK_ID = require('../middleware/check-paramId');

const router = express.Router();

router.route('/socials').get(GET_SOCIALS).post(CREATE_SOCIAL);
router.route('/socials/:id').delete(CHECK_ID, DELETE_SOCIALS);

module.exports = router;

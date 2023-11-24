const express = require('express');
const {
	CREATE_MODULE,
	GET_MODULES,
	MODULE_DETAILS,
	REMOVE_ARTICLE,
	MODULE_TO_TOPIC,
	DELETE_MODULE,
	UPDATE_MODULE,
} = require('../conrtollers/modules.controller');
const router = express.Router();

router.route('/module').post(CREATE_MODULE).get(GET_MODULES);
router
	.route('/module/:id')
	.get(MODULE_DETAILS)
	.delete(DELETE_MODULE)
	.put(UPDATE_MODULE);
router.route('/module/remove-article/:m_id/:a_id').get(REMOVE_ARTICLE);
router.route('/module-to-topic/:id').post(MODULE_TO_TOPIC);

module.exports = router;

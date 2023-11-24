const CHECK_ID = (req, res, next, val) => {
	if (!req.params.id) {
		return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
	}
	next();
};

module.exports = CHECK_ID;

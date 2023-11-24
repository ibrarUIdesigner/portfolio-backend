// * CATACH ASYNC ERROR
const CATCH_ASYNC_ERROR = (fn) => {
	console.log('CATCHING');
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};

module.exports = CATCH_ASYNC_ERROR;

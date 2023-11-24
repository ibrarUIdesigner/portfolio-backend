// * DEVELOPEMNT ERRORS
const DEVELOPMENT_ERROR = (err, res) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'fails';
	return res.status(err.statusCode).json({
		status: err.status || 'fails',
		code: err.statusCode || 500,
		message: err.message,
		name: err.name,
		error_code: err.code,
		error: err.stack,
	});
};

//* PRODUCTION ERRORS
const PRODUCTION_ERRORS = (err, res) => {
	return res.status(err.statusCode).json({
		status: err.status,
		code: err.statusCode,
		message: err.message,
	});
};

const ERROR_HANDLER = (err, req, res, next) => {
	if (process.env.NODE_ENV == 'development ') DEVELOPMENT_ERROR(err, res);
	if (process.env.NODE_ENV == 'production ') PRODUCTION_ERRORS(err, res);

	next();
};

module.exports = ERROR_HANDLER;

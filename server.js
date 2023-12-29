const app = require('./index');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;
// const DB = process.env.DATA_BASE;
const DB = process.env.DATA_BASE_LIVE.replace(
	'<password>',
	process.env.DATABASE_PASSWORD,
);

console.log(DB);

console.log('PORT IS HERE', PORT);
mongoose
	.connect(DB)
	.then((con) => console.log('DATABASE conected successfully!'));

app.listen(PORT, () => {
	console.log(
		`Example app listening at http://localhost:${PORT} in ${MODE} mode`,
	);
});

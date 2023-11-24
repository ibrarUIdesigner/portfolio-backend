const multer = require('multer');
const path = require('path');

// FILE UPLOADING MIDDLEWARE

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads/');
	},
	filename: (req, file, cb) => {
		// Define the filename of the uploaded file
		console.log('inside filename');
		console.log(file);
		console.log(file.fieldname);
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
		);
	},
});

const upload = multer({ storage: storage });

module.exports = upload;

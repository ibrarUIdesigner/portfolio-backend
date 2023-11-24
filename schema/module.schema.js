const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
	title: { type: String, requied: true },
	articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blogs' }],
	// topic: { type: String, requied: true, ref: 'topics' },
});

const MODULES = mongoose.model('modules', moduleSchema);

module.exports = MODULES;

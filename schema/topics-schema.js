const mongoose = require('mongoose');

const topicsSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	icon: { type: String, required: true },
	// articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blogs' }],
	modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'modules' }],
});

const TOPICS = mongoose.model('topics', topicsSchema);

module.exports = TOPICS;

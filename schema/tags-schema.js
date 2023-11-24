const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
	name: { type: String, required: true },
});

const TAGS = mongoose.model('tags', tagsSchema);

module.exports = TAGS;

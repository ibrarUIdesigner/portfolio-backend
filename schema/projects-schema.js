const mongoose = require('mongoose');

// SCHEMA
const projectsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	url: { type: String, required: true },
	snaps: { type: String, required: true },
});

const PROJECTS = mongoose.model('projects', projectsSchema);

module.exports = PROJECTS;

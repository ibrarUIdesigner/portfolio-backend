const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
	category: { type: String, required: true },
	blog_snaps: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	details: { type: String, required: true },
	views: { type: Number, default: 0 },
	tags: { type: [String], default: [] },
	createdAt: { type: Date, default: Date.now },
});

// Create a virtual property for reading time
blogsSchema.virtual('readingTime').get(function () {
	const wordsPerMinute = 225; // Adjust as needed
	const words = this.details.split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
});

const BLOGS = mongoose.model('blogs', blogsSchema);
module.exports = BLOGS;

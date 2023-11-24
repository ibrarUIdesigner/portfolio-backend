const mongoose = require('mongoose');

const socilasSchema = new mongoose.Schema({
	brand_name: { type: String, requires: true },
	profile_url: { type: String, requires: true },
	icon: { type: String, requires: true },
});

const SOCILAS = mongoose.model('socials', socilasSchema);

module.exports = SOCILAS;

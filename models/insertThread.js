const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const InsertSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	tags: [{
		type: String,
		required: true
	}],
	date: {
		type: Date,
		required: true
	},
	postedBy: {
		type: String,
		required: true
	}

});

module.exports = mongoose.model("insertThread",InsertSchema);
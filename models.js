'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	number: String,
	answered: {type: Boolean, default: false},
});

QuestionSchema.method("answer", function(callback) {
	this.answered = true;
	this.parent().save(callback);
});

var UserSchema = new Schema({
	userName: {type: String, unique: true, required: true},
	createdAt: {type: Date, default: Date.now},
	questions: [QuestionSchema]
});

// UserSchema.method("seedHoukah", function(callback) {
// 	//Question Ranges
// 	var qRange = 37 + 4 + 46;
// 	for (var i = 0; i < qRange; i++) {
// 		this.questions[i].answered = true;
// 	}
// 	this.save(callback);
// });

var User = mongoose.model("User", UserSchema);

module.exports.User = User;














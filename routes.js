'use strict';

//Question Ranges
var qRange = [37,4,54,97,23,27,20,63,40,8,13,28,6,13];

var express = require("express");
var router = express.Router();
var User = require("./models").User;

router.param("uID", function(req,res,next,id){
	User.findById(id, function(err, doc){
		if(err) return next(err);
		if(!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.user = doc;
		return next();
	});
});

router.param("qID", function(req,res,next,id){
	req.question = req.user.questions.id(id);
	if(!req.question) {
		err = new Error("Not Found");
		err.status = 404;
		return next(err);
	}
	next();
});

// GET /users
// Route for users collection
router.get("/", function(req, res, next){
	User.find({})
				.sort({createdAt: -1})
				.exec(function(err, users){
					if(err) return next(err);
					res.json(users);
				});
});

// POST /users
// Route for creating users
router.post("/", function(req, res, next){
	var user = new User(req.body);
	for (var i = 1; i <= qRange.length; i++) {
		for (var j = 1; j <= qRange[i-1]; j++) {
			user.questions.push({number: i + "." + j});
		}
	}
	user.save(function(err, user){
		if(err) return next(err);
		res.status(201);
		res.json(user);
	});
});

// GET /users/:id
// Route for specific users
router.get("/:uID", function(req, res, next){
	res.json(req.user);
});

// POST /users/:uID/questions/:qID/answer
// Mark a question as answered
router.post("/:uID/questions/:qID/answer", 
	function(req, res, next){
		req.question.answer(function(err, question){
			if(err) return next(err);
			res.json(req.user);
		});
});

// // POST /users/:uID/seedHoukah
// // Seed  Houkah
// router.post("/:uID/seedHoukah", 
// 	function(req, res, next){
// 		req.user.seedHoukah(function(err, question){
// 			if(err) return next(err);
// 			res.json(req.user);
// 		});
// });

module.exports = router;

















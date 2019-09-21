const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');

router.post('/', (req, res, next) => {
	const body = req.body;
	User.create(body)
	.then(result => {
		if(result) {
			res.status(201).json({
			message: "sign up completed",
			user: result
			})
		} else {
			next({
				message: "Can't create user",
				name: "Invalid"
			})
		}
	})
	.catch(next);
});

module.exports = router;
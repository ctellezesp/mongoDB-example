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

router.post('/login', (req, res, next) => {
	const body = req.body;
	if(!body.username || !body.password) return next({
		message: "Username or password are missing",
		name: "Invalid"
	});

	User.findOne({username: body.username})
	.then(result => {
		if(result) {
			//comparar contraseña
			result.comparePass(body.password, function(err, isMatch) {
				if(err) throw(err);
				if(isMatch) {
					res.status(200).json({
						message: "Successfully logged in",
						user: result //TODO: access token JWT
					})
				} else {
					res.status(401).json({
						message: "Username or password are incorrect",
						name: "Forbidden"
					});
				}
			})
		} else {
			next({
				message: "Username or password are incorrect",
				name: "Forbidden"
			})
		}
	})
	.catch(next);
})

module.exports = router;
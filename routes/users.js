const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

router.get('/', verifyToken ,function(req,res,next) {
	jwt.verify(
		req.token,
		'secretKey',
		(err, authData) => {
			if(err) next(err);
			User.find({})
			.then(result => {
				if(result.length) {
					res.status(200).json({result, authData});
				}
			})
		}
	)
	User.find({})
	.then(result => {
		if(result.length) {
			res.status(200).json({result});
		}
	})
	.catch(next);
});

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
					jwt.sign(
						{result}, //auth data
						'secretKey', //secret
						{expiresIn: '120s'},
						(err, accessToken) => {
							if(err) next({
								message: "Invalid operation",
								name: "Forbidden"
							});

							res.status(200).json({accessToken});
						}
					);
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
});

function verifyToken(req, res, next) {
	//token es correcto y valido
	//if true next()
	//if false next(err)
	const bearerHeader = req.headers['authorization'];
	let token = bearerHeader.split(' ');
	if(token && token[1]) {
		//si llego token
		req.token = token[1];
		next();
	} else {
		next({
			message: "Invalid token",
			name: "Forbidden"
		});
	}
}



module.exports = router;
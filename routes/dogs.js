const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const Dog = require('../models/dogs.js');

//Creates model for Route
const dogSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	age: Number
})
const Dog = mongoose.model('dogs', dogSchema);

// Endpoints
// Index get /Dogs
router.get('/', (req, res) => {
	Dog.find({})
	.then(result => {
		if(result.length)
			res.status(200).send(result);
		else 
		res.status(404).send('There are no dogs');
	})
	.catch(error => {
		res.status(500).send(error);
	})
});

//CREATE POST /dogs
router.post('/', (req,res) => {
	const body = req.body;
	const newDog = new Dog({
		_id: new mongoose.Types.ObjectId(),
		...body
	});

	newDog.save()
	.then(result => {
		if(result)
			res.status(201).send(result);
		else 
		res.status(404).send('Cant create dog');
	})
	.catch(error => {
		res.status(500).send(error);
	})
});

//GET - Dog
router.get('/:id', (req,res) => {
	let id = req.params.id;
	Dog.findById(id).exec()
	.then(result => {
		if(result) {
			res.status(200).send(result);
		} else {
			res.status(404).send('dog not found!');
		}
	})
	.catch(err => {
		res.status(500).send('Cant fetch dog');
	});
});

//PUT - Dogs
router.put('/:id', (req, res) => {
	let id = req.params.id;
	let body = req.body;

	Dog.findByIdAndUpdate(id, body, {new: true})
	.then(result => {
		if(result) {
			res.status(200).send(result);
		} else {
			res.status(404).send('Cant update, this dog is missing');
		}
	})
	.catch(error => {
		res.status(500).send(error);
	});
});

//DELETE - DOGS

router.delete('/:id', (req, res) => {
	let id = req.params.id;
	Dog.findByIdAndRemove(id)
	.then(() => {
		res.status(204).send();
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

module.exports = router;
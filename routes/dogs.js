const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dog = require('../models/dogs.js');

//Creates model for Route
/*const dogSchema = new mongoose.Schema({
	//_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: [true, 'is required']
	},
	age: {
		type: Number,
		default: 0
	}
})
const Dog = mongoose.model('dogs', dogSchema);*/

// Endpoints
// Index get /Dogs
router.get('/', (req, res, next) => {
	Dog.find({})
	.then(result => {
		if(result.length)
			res.status(200).json({
				message: "There are many dogs ",
				dog: result
			});
		else 
		res.status(404).send('There are no dogs');
	})
	.catch(next);
});

//CREATE POST /dogs
router.post('/', (req, res, next) => {
	const body = req.body;
	/*const newDog = new Dog({
		_id: new mongoose.Types.ObjectId(),
		...body
	});

	newDog.save()*/
	Dog.create(body)
	.then(result => {
		if(result)
			res.status(201).json({
				message: "New dog Created",
				dog: result
			});
		else 
		res.status(404).json({
			message: "Can't created dog"
		});
	})
	.catch(next);
});

//GET - Dog
router.get('/:id', (req, res, next) => {
	let id = req.params.id;
	Dog.findById(id)
	.then(result => {
		if(result) {
			res.status(200).json({
				message: "You find the dog",
				dog: result
			});
		} else {
			res.status(404).send('dog not found!');
		}
	})
	.catch(next);
});

//PUT - Dogs
router.put('/:id', (req, res, next) => {
	let id = req.params.id;
	let body = req.body;

	Dog.findByIdAndUpdate(id, body, {new: true})
	.then(result => {
		if(result) {
			res.status(200).json({
				message: "Dog modificated",
				dog: result
			});
		} else {
			res.status(404).send('Cant update, this dog is missing');
		}
	})
	.catch(next);
});

//DELETE - DOGS

router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	Dog.findByIdAndRemove(id)
	.then(() => {
		res.status(204).json({
			message: "Dog Deleted correctly"
		});
	})
	.catch(next);
});

module.exports = router;
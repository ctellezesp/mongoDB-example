const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose'); //usar mongoose

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dogsRouter = require('./routes/dogs');


mongoose.connect('mongodb://127.0.0.1:27017/petsDB', {
	useNewUrlParser: true, useUnifiedTopology: true
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/resources', express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dogs', dogsRouter);
app.use('/cats', (req,res) => {
	res.status(404).send("we don't like cats");
});
app.use((error, req, res, next) => {
	if(error) {
		res.status(422).json({
			message: error.message,
			type: error.name
		})
	}
})
module.exports = app;

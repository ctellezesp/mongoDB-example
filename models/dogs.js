const mongoose = require('mongoose');
const dogSchema = new mongoose.Schema({
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
module.exports = mongoose.model('dogs', dogSchema);
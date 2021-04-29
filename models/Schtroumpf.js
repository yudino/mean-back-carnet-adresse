const mongoose = require('mongoose');

const schtroumpfSchema = mongoose.Schema({
    age: { type: Number, required: true },
    famille: { type: String, required: true },
    race: { type: String, required: true },
    nourriture: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: false },
})

module.exports = mongoose.model('Schtroumpf', schtroumpfSchema );

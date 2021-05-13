const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');
const {Schema} = require("mongoose");

const userSchema = mongoose.Schema({
    age: { type: Number, required: true },
    famille: { type: String, required: true },
    race: { type: String, required: true },
    nourriture: { type: String, required: true },
    imageUrl: { type: String, required: false },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

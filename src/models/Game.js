const mongoose = require('mongoose');

const Game = mongoose.Schema({
    ID: { type: Number, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    developer: { type: String, require: true },
    publisher: { type: String, require: true },
    price: { type: String, require: true },
    genre: { type: Array, require: true },
    editions: { type: Number, require: true },
    releaseDate: { type: Date, require: true }

});

module.exports = mongoose.model('game', Game);

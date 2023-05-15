const mongoose = require('mongoose');

const Game = mongoose.Schema({
    name: { type: String, default: 'N/A' },
    description: { type: String, default: 'N/A' },
    developer: { type: String, default: 'N/A' },
    publisher: { type: String, default: 'N/A' },
    price: { type: Number, default: 0 },
    genre: { type: Array, default: [] },
    releaseDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('game', Game);

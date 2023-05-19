const mongoose = require('mongoose');

const Game = mongoose.Schema({
    name: { type: String, default: 'N/A' },
    sideDescription: { type: String, default: 'N/A' },
    mainDescription: { type: String, default: 'N/A' },
    developer: { type: String, default: 'N/A' },
    publisher: { type: String, default: 'N/A' },
    price: { type: Array, default: [] },
    genre: { type: Array, default: [] },

    releaseDate: { type: Date, default: Date.now },
    sliderImgs: { type: Array, default: [] },
    sideImg: { type: String, default: 'N/A' }
});

module.exports = mongoose.model('game', Game);


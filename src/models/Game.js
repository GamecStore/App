const mongoose = require('mongoose');

const Game = mongoose.Schema({
    name: { type: String, default: 'N/A' },
    sideDescription: { type: String, default: 'N/A' },
    mainDescription: { type: String, default: 'N/A' },
    developer: { type: String, default: 'N/A' },
    publisher: { type: String, default: 'N/A' },
    price: { type: Number, default: 60 },
    genre: { type: Array, default: [] },
    created: { type: Date, default: Date.now },
    releaseDate: { type: Date, default: Date.now },
    sliderImgs: { type: Array, default: [] },
    sideImg: { type: String, default: 'N/A' },
    user:
    {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    }

});

module.exports = mongoose.model('game', Game);


const mongoose = require('mongoose');

const Game = mongoose.Schema({
    developer: {
        type: String,
        default: 'N/A'
    },
    publisher: { 
        type: String,
        default: 'N/A'
    },
    adminEmail: {
        type: String,
        default: 'N/A'
    },    
    name: { //game title
        type: String,
        required: [true, "A game must have a title"]
    },
    sideDescription: {
        type: String,
        required: [true, "A game must have a side description"]
    },
    mainDescription: {
        type: String,
        required: [true, "A game must have a main description"]
    },
    price:{
        type: Number,
        required: [true, "A game must have a price"]
    },
    genre: {
        type: String,
        required: [true, "A game must have a genre"]
    },
    platform: {
        type: String,
        required: [true, "A game must have a platform"]
    },
    sliderImgs: { 
        type: Array,
        required: [true, "A game must have a some images"]
    },
    sideImg: {
        type: String,
        required: [true, "A game must have a poster"]
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    }
}, { timestamps: true });

module.exports = mongoose.model('game', Game);


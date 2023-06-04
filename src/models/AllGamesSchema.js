const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const allGamesSchema = new Schema({
    adminName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    gameTitle: {
        type: String,
        required: [true, "Uploaded file must have a game title"]
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image:{
        data: Buffer,
        contentType: String
    }
});


const AllGames = mongoose.model('AllGames', allGamesSchema);
module.exports = AllGames;
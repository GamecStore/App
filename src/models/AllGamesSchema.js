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
    image:{
        type:String,
        required: true
    }
},{timestamps: true});



const AllGames = mongoose.model('AllGames', allGamesSchema);
module.exports = AllGames;
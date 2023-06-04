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
        required: [true, "A game must have a title"]
    },
    description: {
        type: String,
        required: [true, "A game must have a description"]
    },
    price: {
        type: Number,
        required:  [true, "A game must have a price"]
    },
    genre: {
        type: String,
        required:  [true, "A game must have a genre"]
    },
    platform: {
        type: String,
        required:  [true, "A game must have a platform"]
    },
    poster:{
        type:String,
        required:  [true, "A game must have a poster"]
    }
},{timestamps: true});



const AllGames = mongoose.model('AllGames', allGamesSchema);
module.exports = AllGames;
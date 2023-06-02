const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const allGamesSchema = new Schema({
    adminName:{
        type: String,
        required: true
    },
    adminEmail:{
        type: String,
        required: true
    },
    gameTitle:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});


const All_Games = mongoose.model('AllGames', allGamesSchema);
module.exports = All_Games;

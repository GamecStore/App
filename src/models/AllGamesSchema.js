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
        data: Buffer,
        contentType: String,
        required: true
    }
});


const AllGames = mongoose.model('AllGames', allGamesSchema);
module.exports = AllGames;

const mongoose = require('mongoose');

const AllGames = mongoose.Schema({
    adminName:String,
    adminEmail:String,
    gameTitle:String,
    price:Number,
    genre:String,
    image:String
});


const All_Games = mongoose.model('AllGames', allGames);
module.exports = All_Games;

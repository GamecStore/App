const mongoose = require('mongoose');

const AllGames = mongoose.Schema({
    adminName:String,
    adminEmail:String,
    gameTitle:String,
    price:Number,
    genre:String,
    image:String
});

module.exports = mongoose.model('AllGames', AllGames);


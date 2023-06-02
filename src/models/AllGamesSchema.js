const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const allGamesSchema = new Schema({
    adminName:String,
    adminEmail:String,
    gameTitle:String,
    price:Number,
    genre:String,
    image:String
});


const All_Games = mongoose.model('AllGames', allGamesSchema);
module.exports = All_Games;

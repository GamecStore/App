const AllGames = require('../models/AllGamesSchema');

const allGames_get = (req, res) => {
    res.render("pages/allGames")
}


const allGames_post = async (req, res) => {
    res.render("pages/allGames");
    //variable = new "model_name()
    //req.body --> el data el ktbtha fel input
    const games = new AllGames (req.body);
    console.log(req.body);
  
    //saving data in the database
    games.save()
    .then(() => console.log("success"))
    .catch((err) => console.log(`[MONGO] Error connecting to MongoDB: ${err}`)); 
}


module.exports = {
    allGames_get,
    allGames_post
};


const AllGames = require('../models/AllGamesSchema');

const allGames_get = (req, res) => {
    res.render("pages/allGames")
}

 
const allGames_post = (req, res) => {
    const Games =  new AllGames(req.body)
    res.send(req.body.adminName);
    Games.save()
    .then((result) => console.log("Succesfully saved".yellow))
    .catch((err) => console.log(err))
}


module.exports = {
    allGames_get,
    allGames_post
};


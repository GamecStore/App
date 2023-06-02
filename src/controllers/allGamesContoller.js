const AllGames = require('../models/AllGamesSchema');

const allGames_get = (req, res) => {
    res.send("savedddd")
}


const allGames_post = (req, res) => {
    const Games =  new AllGames(req.body)
    Games.save()
    .then((result) => console.log("SUccesfully saved"))
    .catch((err) => console.log(err))
}


module.exports = {
    allGames_get,
    allGames_post
};

const AllGames = require('../models/AllGamesSchema');

const allGames_get = (req, res) => {
    res.render("pages/allGames")
}

 
const allGames_post = (req, res) => {
    const Games =  new AllGames(req.body)
    // res.send(req.body.adminName);
    Games.save()
    .then(() =>{ 
        console.log("Succesfully saved".yellow);
        res.redirect('/allGames');
    })
    .catch((err) => {
        res.redirect("/errorAdding");
        console.log(err.red);
    })
}


module.exports = {
    allGames_get,
    allGames_post
};


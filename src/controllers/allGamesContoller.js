const AllGames = require('../models/AllGamesSchema');

const allGames_get = (req, res) => {
    res.render("pages/allGames")
}


let locals = { errorMessage : 'something went wrong' }
const allGames_post = async (req, res) => {
    const Games = new AllGames(req.body)
    // res.send(req.body.adminName);
    await Games.save()
    try {
        console.log("Succesfully saved".yellow);
        res.redirect('/allGames');
    } catch (err) {
        res.send("error");
        // res.render('pages/addingGames',locals);
        console.log(err.red);
    }

}


module.exports = {
    allGames_get,
    allGames_post
};


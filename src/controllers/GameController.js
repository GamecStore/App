const Game = require('../models/Game.js')
const user = require('../models/User.js')
const games = require('../models/Game')






const gamepage = (req, res) => {
    const id = req.params.id;
    game = games.findOne({ _id: id }).then((game) => {
        console.log(game)
        res.render('pages/gamePage', { game, user: req.session.user })
    })
}

const searchGame = (req, res) => {
    const search = req.body.search;
    games.findOne({ name: { $regex: search, $options: 'i' } }).then((game) => {
        // res.render('pages/gamePage', { game, user: req.session.user })
        res.redirect('/gamepage/' + game._id)
    })
}




// all games page
const allGames_get = (req, res) => {
    Game.find()
        .then((result) => {
            res.render("pages/allGames", { gamesArray: result, user: req.session.user });
        })
        .catch((err) => (console.error(err)));
}


const allGames_post = async (req, res) => {
    const gamePoster = req.file.filename;
    const games = new Game({
        name: req.body.name,
        sideDescription: req.body.sideDescription,
        mainDescription: req.body.mainDescription,
        price: req.body.price,
        genre: req.body.genre,
        platform: req.body.platform,
        sideImg: gamePoster
    });
    if (req.files) {
        let path = '';
        req.files.forEach(function (files, index, arr) {
            path = path + files.path + '/';
        })
        path = path.substring(0, path.indexOf('/'))
        games.sliderImgs = path;
    }
    res.redirect('/admin/products');

    //saving data in the database
    games.save()
        .then(() => console.log("success"))
        .catch((err) => console.log(`[MONGO] Error in saving data in database: ${err}`));
}


module.exports = {


    gamepage,
    searchGame,
    allGames_get,
    allGames_post
};

const Game = require("../models/Game.js");
const user = require("../models/User.js");

const gamepage = (req, res) => {
  const id = req.params.id;
  game = Game.findOne({ _id: id }).then((game) => {
    console.log(game);
    res.render("pages/gamePage", { game, user: req.session.user });
  }).catch(() => res.render("pages/ErrorPage"));
};

const searchGame = (req, res) => {
  const search = req.body.search;
  Game.findOne({ name: { $regex: search, $options: "i" } }).then((game) => {
    // res.render('pages/gamePage', { game, user: req.session.user })
    res.redirect("/gamepage/" + game._id);
  });
};


const allGames_edit = async (req, res) => {
  const id = req.params.id;
  const gamePoster = req?.file?.filename;
  const game = await Game.findById(id);
  if (req.body.name) game.name = req.body.name;
  if (req.body.sideDescription) game.sideDescription = req.body.sideDescription;
  if (req.body.mainDescription) game.mainDescription = req.body.mainDescription;
  if (req.body.price) game.price = req.body.price;
  if (req.body.genre) game.genre = req.body.genre;
  if (req.body.platform) game.platform = req.body.platform;
  if (gamePoster) game.sideImg = gamePoster;
  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + "/";
    });
    path = path.substring(0, path.indexOf("/"));
    game.sliderImgs = path;
  }
  await game.save();
  res.redirect("/admin/products");
};


// all games page
const allGames_get = (req, res) => {
  Game.find()
  .then((result) => {
    res.render("pages/allGames", {
      gamesArray: result,
      user: req.session.user,
    });
  })
  .catch((err) => console.error(err));


};




const allGames_post = async (req, res) => {
  const gamePoster = req?.file?.filename;
  const games = new Game({
    name: req.body.name,
    sideDescription: req.body.sideDescription,
    mainDescription: req.body.mainDescription,
    price: req.body.price,
    genre: req.body.genre,
    platform: req.body.platform,
    sideImg: gamePoster,
  });
  res.redirect("/admin/products");

  //saving data in the database
  games
    .save()
    .then(() => console.log("success"))
    .catch((err) =>
      console.log(`[MONGO] Error in saving data in database: ${err}`)
    );
};



module.exports = {
  gamepage,
  searchGame,
  allGames_get,
  allGames_post,
  allGames_edit,
};

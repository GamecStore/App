const AllGames = require('../models/AllGamesSchema');

const allGames_get = (req, res) => {
    AllGames.find()  
    .then((result)=>{
        res.render("pages/allGames",{gamesArray: result});
    })
    .catch((err) => (console.error(err)));
}

const allGames_post = (req, res) => {
    res.render("pages/allGames");
    const gamePoster = req.file.filename;
    const games = new AllGames ({
        adminName: req.body.adminName,
        adminEmail: req.body.adminEmail,
        gameTitle: req.body.gameTitle,
        description:req.body.description,
        price:req.body.price,
        genre: req.body.genre,
        platform: req.body.platform,
        poster:gamePoster
    });
    console.log(req.body);
    if(req.file){
        games.poster = req.file.path;
    }

    //saving data in the database
    games.save()
    .then(() => console.log("success"))
    .catch((err) => console.log(`[MONGO] Error in saving data in database: ${err}`)); 
}


// //API Endpoint for uploading file
// app.post("/api/uploadFile", upload.single("image"), (req, res) => {
//     //In the case of there being many files, we can use multiple instead of single.
//     // Stuff to be added later
//     console.log(req.file);
// });


module.exports = {
    allGames_get,
    allGames_post
};

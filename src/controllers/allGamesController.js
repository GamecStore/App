// const AllGames = require('../models/AllGamesSchema');

// const allGames_get = (req, res) => {
//     AllGames.find()  
//     .then((result)=>{
//         res.render("pages/allGames",{gamesArray: result, user: req.session.user });
//     })
//     .catch((err) => (console.error(err)));    
// } 


// const allGames_post = (req, res) => {
//     const gamePoster = req.file.filename;
//     const games = new AllGames ({
//         gameTitle: req.body.gameTitle,
//         description:req.body.description,
//         price:req.body.price,
//         genre: req.body.genre,
//         platform: req.body.platform,
//         poster:gamePoster
//     });

//     console.log(req.body);

//     res.render("pages/allGames");

//     //saving data in the database
//     games.save()
//     .then(() => console.log("success"))
//     .catch((err) => console.log(`[MONGO] Error in saving data in database: ${err}`)); 
// }


// module.exports = {
//     allGames_get,
//     allGames_post
// };

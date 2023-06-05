const AllGames = require('../models/AllGamesSchema');
const fs = require('fs');

const allGames_get = (req, res) => {
    AllGames.find()  
    .then((result)=>{
        res.render("pages/allGames",{gamesArray: result});
        console.log(result);
    })
    .catch((err) => (console.error(err)));    
}


const allGames_post = (req, res) => {
    const gamePoster = req.file.filename;
//     let base64String = "";
//     const gamePoster = () =>{
//         const file = document.querySelector('input[type=file]')['files'];

//         const reader = new FileReader();
//         console.log("next");

//         reader.onload = function () {
//             base64String = reader.result.replace("data:", "")
//                 .replace(/^.+,/, "");

//             imageBase64Stringsep = base64String;
//             console.log(imageBase64Stringsep);
//         }
//         reader.readAsDataURL(file);

//     }

    
    const games = new AllGames ({
        gameTitle: req.body.gameTitle,
        description:req.body.description,
        price:req.body.price,
        genre: req.body.genre,
        platform: req.body.platform,
        poster:gamePoster
    });

    console.log(req.body);
    // if(req.file){
    //     games.poster = req.file.path;
    // }

    res.render("pages/allGames");

    //saving data in the database
    games.save()
    .then(() => console.log("success"))
    .catch((err) => console.log(`[MONGO] Error in saving data in database: ${err}`)); 
}


module.exports = {
    allGames_get,
    allGames_post
};

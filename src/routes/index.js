const express = require('express')
const router = express.Router()
const AllGames = require('../models/Game');

router.get = ('/',(req, res) => {
    AllGames.find()  
    .then((result)=>{
        res.render("/",{gamesArray: result});
        console.log(result);
    })
    .catch((err) => (console.error(err)));    
}); 

module.exports = router 

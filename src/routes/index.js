const express = require('express')
const router = express.Router()
const Game = require('../models/Game');
router.get('/', (req, res) => {
    Game.find()
        .then((result) => {
            res.render('pages/index', { obj: result, user: req.session.user });
        })
        .catch((err) => (console.error(err)));
});


module.exports = router 

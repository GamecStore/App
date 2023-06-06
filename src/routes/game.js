const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');


router.get('/gamepage/:id', GameController.gamepage);
router.post('/search', GameController.searchGame);




module.exports = router;

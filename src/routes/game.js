const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');

router.get('/games', GameController.getAllGames);
router.get('/games/:id', GameController.getGameById);
router.post('/games', GameController.createGame);
router.put('/games/:id', GameController.updateGameById);
router.delete('/games/:id', GameController.deleteGameById);
router.get('/gamepage/:id', GameController.gamepage);
router.post('/search', GameController.searchGame);




module.exports = router;

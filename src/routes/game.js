const { gameController } = require('../controllers/GameController.js');

module.exports = (app) => {
    app.post('/game', gameController);
}
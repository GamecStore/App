const { testController } = require('../controllers/UserController.js');

module.exports = (app) => {
    app.get('/test', testController);
}
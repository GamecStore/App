const { testController } = require('../controllers/UserController.js');

module.exports = (app) => {
    app.post('/test', testController);
}
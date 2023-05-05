const { userController } = require('../controllers/UserController.js');

module.exports = (app) => {
    app.post('/test', userController);
}
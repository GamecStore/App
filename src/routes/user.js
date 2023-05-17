const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/login', (req, res) => {
    res.render('pages/login')
})



router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);


router.get('/login', (req, res) => {
    res.send('login page');
})

module.exports = router;

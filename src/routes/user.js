const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const bcrypt = require('bcrypt');


router.get('/history', (req, res) => {
    res.render('pages/history');
});
router.get('/orders', (req, res) => {
    res.render('pages/admin/orders')
})

router.get('/signup', (req, res) => {
    res.render('pages/signup');
});

router.get('/login', (req, res) => {
    res.render('pages/login')
})

router.get('/cart', (req, res) => {
    res.render('pages/cart');
});


//get user information
// app.get('/signup', (req, res) => {
//     res.render('pages/signup')
// });


router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUserById);
router.delete('/users/:id', UserController.deleteUserById);
router.post('/signup', UserController.createUser);

// just in case
// router.get('/', UserController.getAllUsers);
// router.get('/:id', UserController.getUserById);
// router.post('/', UserController.createUser);
// router.put('/:id', UserController.updateUserById);
// router.delete('/:id', UserController.deleteUserById);




module.exports = router;

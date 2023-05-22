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

//get user information
// app.get('/signup', (req, res) => {
//     res.render('pages/signup')
// });


router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUserById);
router.delete('/users/:id', UserController.deleteUserById);


// just in case
// router.get('/', UserController.getAllUsers);
// router.get('/:id', UserController.getUserById);
// router.post('/', UserController.createUser);
// router.put('/:id', UserController.updateUserById);
// router.delete('/:id', UserController.deleteUserById);
router.post('/signup', (req, res) => {
    const user = new User(
        {
            username: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            dob: req.body.dob,
            gender: req.body.gender,

        });

    user.save()
        .then(() => res.send('User saved to database'))
        .catch(err => console.error(err));
});



module.exports = router;

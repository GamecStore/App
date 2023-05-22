const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

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
    const { firstname, lastname, email, password, confirmpassword, dob, gender, userType } = req.body;
    const user = new User(
        {
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
            dob,
            gender,
            userType
        });
    user.save()
        .then(() => res.send('User saved to database'))
        .catch(err => console.error(err));
});


module.exports = router;

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

router.get('/editProfile', (req, res) => {
    res.render('pages/editProfile')
})
router.get('/contactus', (req, res) => {
res.render('pages/contactus');
});


// router.get('/cart', (req, res) => {
//     games = [
//         {
//             id: 1,
//             name: 'God Of war Ragnarock',
//             sideDescription: 'Journey to dangerous and stunning landscapes Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.',
//             mainDescription: 'From Santa Monica Studio comes the sequelto the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.Along the way they will explore stunning, mythical landscapes, and face fearsome enemies in the form of Norse gods and monsters. The threat of Ragnarök grows ever closer.Kratos and Atreus must choose between their own safety and the safety of the realms. ',
//             developer: 'Sony Santa Monica ',
//             publisher: 'Sony Entertainment',
//             price: 59.99,
//             editionsDesc: ['God of War Ragnarök ps4'],
//             sliderImgs: ['GOWR1.webp', 'GOWR2.webp', 'GOWR3.webp', 'GOWR3.webp', "GOWR2.webp"],
//             sideImg: 'GOWRSide.jpg'
//         },
//         {
//             id: 2,
//             name: 'God Of war Ragnarock',
//             sideDescription: 'Journey to dangerous and stunning landscapes Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.',
//             mainDescription: 'From Santa Monica Studio comes the sequelto the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.Along the way they will explore stunning, mythical landscapes, and face fearsome enemies in the form of Norse gods and monsters. The threat of Ragnarök grows ever closer.Kratos and Atreus must choose between their own safety and the safety of the realms. ',
//             developer: 'Sony Santa Monica ',
//             publisher: 'Sony Entertainment',
//             price: 59.99,
//             editionsDesc: ['God of War Ragnarök ps4'],
//             sliderImgs: ['GOWR1.webp', 'GOWR2.webp', 'GOWR3.webp', 'GOWR3.webp', "GOWR2.webp"],
//             sideImg: 'GOWRSide.jpg'
//         }
//     ]
//     let sum = 0

//     res.render('pages/cart', { games, sum })
// })

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUserById);
router.delete('/users/:id', UserController.deleteUserById);
router.post('/signup', UserController.createUser);
router.post('/login', UserController.login);
router.post('/checkName', UserController.checkName);
router.post('/editprofile', UserController.editProfile);
router.post('/Game/:id/addcart', UserController.addcart);
router.post('/contactus', UserController.contactus);
router.get('/cart', UserController.viewcart);
router.post('/Game/:id/deletecart', UserController.deletecart);
// just in case
// router.get('/', UserController.getAllUsers);
// router.get('/:id', UserController.getUserById);
// router.post('/', UserController.createUser);
// router.put('/:id', UserController.updateUserById);
// router.delete('/:id', UserController.deleteUserById);
module.exports = router;

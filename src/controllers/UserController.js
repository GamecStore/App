const User = require('../models/User');
const config = require('../config.json');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(config.gridsend)

const bcrypt = require('bcrypt');
const saltRounds = 10;
const createUser = async (req, res) => {
    try {
        // const user = new User(req.body);
        // await user.save();
        // res.status(201).json(user);

        console.log(req.body)
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const user = new User(
                {
                    email: req.body.email,
                    gender: req.body.gender,
                    username: req.body.name,

                    password: hash,

                    // bcrypt: req.body.password.bcrypt,
                    dob: req.body.dob
                });
            user.save()
            .then(() => {
                const msg = {
                    to: user.email, // Change to your recipient
                    from: 'gamecyt2@gmail.com', // Change to your verified sender
                    subject: 'Sending with SendGrid is Fun',
                    text: 'and easy to do anywhere, even with Node.js',
                    html: '<strong>Welcome to gamec.store</strong>',
                }

                sgMail
                    .send(msg)
                    .then((response) => {
                        console.log(response[0].statusCode)
                        console.log(response[0].headers)
                    })
                    .catch((error) => {
                        console.error(error)
                    })

                res.send('User saved to database')
            })
                .catch(err => console.error(err));
        });




    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'User ID not found , Do you want to regester instead' });
    }
};

const updateUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        Object.assign(user, req.body);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.delete();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};

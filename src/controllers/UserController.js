const User = require('../models/User');
const config = require('../config.json');
const game = require('../models/Game');
const { Configuration, OpenAIApi } = require('openai');


const apiKey = config.openaikey;

//configure OpenAI with our generated api key
const configuration = new Configuration
    ({
        apiKey
    })
const openai = new OpenAIApi(configuration)


//const sgMail = require('@sendgrid/mail')
//sgMail.setApiKey(config.gridsend)

const bcrypt = require("bcrypt");
const { param } = require("../routes");
const saltRounds = 10;
const createUser = async (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const user = new User({
                email: req.body.email,
                gender: req.body.gender,
                username: req.body.name,
                password: hash,
                dob: req.body.dob,
            });
            const { email, gender, username, password, dob } = req.body;
            if (username || !email || !password || !gender || !dob) {
                //         return res.render('Name, email, and password are required');
                //res.send("username email password gender dob are required  ")
            }
            // const emailRegex = /\S+@\S+\.\S+/;
            // if (!emailRegex.test(email)) {
            //     res.send("email is invalid");
            // }
            // if (password <= 8) {
            //     res.send("password must be at least 8 characters ");
            // }
            user
                .save()

                .then(() => {
                    req.session.username = user.username;
                    req.session.password = user.password;
                    req.session.type = user.role;
                    req.session.user = user;
                    console.log(req.session.user);
                    // const msg = {
                    //     to: user.email, // Change to your recipient
                    //     from: 'gamecyt2@gmail.com', // Change to your verified sender
                    //     subject: 'Sending with SendGrid is Fun',
                    //     text: 'and easy to do anywhere, even with Node.js',
                    //     html: '<strong>Welcome to gamec.store</strong>',
                    // }
                    // sgMail
                    //     .send(msg)
                    //     .then((response) => {
                    //         console.log(response[0].statusCode)
                    //         console.log(response[0].headers)
                    //     })
                    //     .catch((error) => {
                    //         console.error(error)
                    //     })

                    res.redirect("/index");
                })
                .catch((err) => console.error(err));
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//trial 2
const login = async (req, res) => {
    const sentUser = req.body.name;
    const user = await User.findOne({ username: sentUser });
    if (user?.username === sentUser) {
        console.log(user.username);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
            if (err) {
                console.log("error");
            }
            if (isMatch) {
                console.log("correct password!");
                req.session.username = user.username;
                req.session.password = user.password;
                req.session.type = user.role;
                req.session.user = user;
                console.log(req.session.user);
                if (user.role === "admin") {
                    res.redirect("/admin/home");
                } else {
                    res.redirect("/");
                }
            }
        });
    } else {
        res.send("username or password is incorrect");
    }
};
const editProfile = async (req, res) => {
    const user = await User.findOne({ username: req.session.username });
    if (user) {
        user.email = req.body.email;
        user.gender = req.body.gender;
        user.dob = req.body.dob;
        user.username = req.body.username;
        await user.save();
        res.redirect('/editprofile');
    } else {
        res.status(404).send('User not found');
    }
};

const contactus = async (req, res) => {
    try {
        //extract the question from the form 
        const { question } = req.body;
        const completion = await openai.createCompletion({

        });
    }
    catch (error) {

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
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res
            .status(500)
            .json({ message: "User ID not found , Do you want to regester instead" });
    }
};

const updateUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
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
            return res.status(404).json({ message: "User not found" });
        }
        await user.delete();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkName = (req, res, next) => {
    User.find({ username: req.body.name })
        .then((user) => {
            if (user.length > 0) {
                res.send("taken");
            } else {
                res.send("available");
            }
        })
        .catch((err) => {
            console.log(err);
        });
};



const addcart = async (req, res) => {
    console.log(req.session.username)
    const user = await User.findOne({ username: req.session.username })
    user.gameids.push(req.params.id)
    await user.save()
    res.send()

}


const signupPage = (req, res) => {
    res.render('pages/signup');
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    login,
    checkName,
    editProfile,
    contactus,
    addcart,
    signupPage
};

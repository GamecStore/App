const User = require('../models/User');
const config = require('../config.json');
const game = require('../models/Game');
const Order = require('../models/Order');



const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(config.gridsend)

const bcrypt = require("bcrypt");
const { param } = require("../routes");

const saltRounds = 10;
const createUser = async (req, res) => {
    try {
        const errors = []
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const user = new User({
                email: req.body.email,
                gender: req.body.gender,
                username: req.body.name,
                password: hash,
                dob: req.body.dob,
            });
            const { email, gender, username, password, dob } = req.body;
            if (!username || !email || !password || !gender || !dob) {
                res.redirect('/signup?message="username email password gender dob are required"')
                //     console.log("username email password gender dob are required must be required")
                //     //res.send("username email password gender dob are required  ")
                //     // errors.push("all fields are required")
            }

            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                // res.render('pages/signup', { user: req.session.user });
                res.redirect('/signup?message="email is required"')
                console.log('email is required');
                // errors.push("email must be a valid email")
            }
            if (password <= 8) {
                // res.render('pages/signup', { user: req.session.user });
                res.redirect('/signup?message="password is required"')
                // errors.push("password must be equal or more than 8 characters")
            }
            // if (errors.length > 0) {
            //     return res.render("/signup", { errors });
            // }
            user
                .save()

                .then(() => {
                    req.session.username = user.username;
                    req.session.password = user.password;
                    req.session.type = user.role;
                    req.session.user = user;
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

                    res.redirect("/");
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

        //const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

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
    if (req.session.user !== undefined) {
        const user = await User.findOne({ username: req.session.username });
        if (user) {
            user.email = req.body.email;
            user.gender = req.body.gender;
            // user.dob = req.body.dob;
            user.username = req.body.username;
            await user.save();
            req.session.user = user;
            console.log(user.username);
            console.log(user.email);

            res.redirect('/editprofile', { user: req.session.user });
        }
    }
    else {
        res.redirect('/login');
    }
};

const contactus = async (req, res) => {
    try {
        //extract the question from the form 

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: req.body.prompt,
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 1024
        });
        response.then((data = {}) => {
            res.send({ message: data.data.choices[0].text })
        });
    }
    catch (error) {
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
    if (req.session.user !== undefined) {
        console.log(req.session.username)
        const user = await User.findOne({ username: req.session.username })
        user.gameids.push(req.params.id)
        await user.save()
        res.redirect('/cart')
    }
    else {
        res.redirect('/login');
    }
}

const viewcart = async (req, res) => {
    if (req.session.user !== undefined) {
        let cartgames = [];
        const user = await User.findOne({ username: req.session.username });
        if (user !== undefined) {
            console.log(user.gameids);
            for (const gameid of user.gameids) {
                const cartgame = await game.findById(gameid);
                cartgames.push(cartgame);
            }

            let sum = 0;
            res.render('pages/cart', { games: cartgames, sum, user: req.session.user });
        } else {
            res.redirect('/login');
        }
    }
    else {
        res.redirect('/login');
    }
};

const deletecart = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.session.username });
        await User.updateOne(
            { _id: user._id },
            { $pull: { gameids: req.params.id } }
        );
        res.redirect('/cart'); // Update the redirect URL with the correct path
    } catch (error) {
        console.error(error);
        res.redirect('/error-page'); // Redirect to an error page if an error occurs
    }
};



const checkout = async (req, res) => {
    if (req.session.user !== undefined) {
        try {
            const user = await User.findOne({ _id: req.session.user });

            if (user !== undefined) {
                let games = [];
                let price = 0;

                for (const gameid of user.gameids) {
                    const cartgame = await game.findById(gameid);
                    games.push(cartgame);
                    price += cartgame.price;
                }

                const order = new Order({
                    user: user._id,
                    games: games,
                    totalPrice: price,
                });

                order.save()
                    .then(async () => {
                        console.log("Order saved");
                        let x = [];
                        let u = await User.findOneAndUpdate({ _id: user._id }, { gameids: x })
                    })
                    .catch((err) => {
                        console.error("Error saving order:", err);
                    });
                console.log(order);
                res.redirect('/library');
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect('/login');
    }
};



const signupPage = (req, res) => {
    res.render('pages/signup', { user: req.session.user });
};

const homepage = (req, res) => {


};


const addwishlist = async (req, res) => {
    if (req.session.user !== undefined) {
        try {
            const user = await User.findOne({ username: req.session.username });
            if (user) {
                if (!user.wishlistids) {
                    user.wishlistids = []; // Initialize the wishlistids array if it doesn't exist
                }
                user.wishlistids.push(req.params.id);
                await user.save();
                res.redirect('/wishlist');
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error(error);
            res.redirect('/error-page');
        }
    }
    else {
        res.redirect('/login');
    }
};

const viewwishlist = async (req, res) => {
    if (req.session.user !== undefined) {
        try {
            let wishlistgames = [];
            const user = await User.findOne({ username: req.session.username });
            if (user !== undefined) {
                console.log(user.wishlistids);
                for (const gameid of user.wishlistids) {
                    const wishlistgame = await game.findById(gameid);
                    wishlistgames.push(wishlistgame);
                }
                console.log(wishlistgames);
                let sum = 0;
                res.render('pages/wishlist', { games: wishlistgames, sum, user: req.session.user });
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.error(error);
            res.redirect('/login');
        }
    }
    else {
        res.redirect('/login')
    }
};

const deletewishlist = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.session.username });
        await User.updateOne(
            { _id: user._id },
            { $pull: { wishlistids: req.params.id } }
        );
        res.redirect('/wishlist'); // Update the redirect URL with the correct path
    } catch (error) {
        console.error(error);
        res.redirect('/error-page'); // Redirect to an error page if an error occurs
    }
};

const checkoutpage = async (req, res) => {


    if (req.session.user !== undefined) {
        try {
            const user = await User.findOne({ _id: req.session.user });

            if (user !== undefined) {
                let games = [];


                for (const gameid of user.gameids) {
                    const cartgame = await game.findById(gameid);
                    games.push(cartgame);

                }
                let sum = 0;
                res.render('pages/checkout', { games: games, user: req.session.user, sum })
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect('/login');
    }

    res.render('pages/checkout', { user: req.session.user, });
};
const loginPage = (req, res) => {
    res.render('pages/login', { user: req.session.user });
};
const historyPage = (req, res) => {
    res.render('pages/history', { user: req.session.user });
};
const contactusPage = (req, res) => {
    res.render('pages/contactus', { user: req.session.user });
};
const editProfilePage = (req, res) => {
    res.render('pages/editProfile', { user: req.session.user });
};
const wishlistPage = (req, res) => {
    res.render('pages/wishlist', { user: req.session.user });
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};
const aboutUsPage = (req, res) => {
    res.render('pages/aboutUs', { user: req.session.user });
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
    viewcart,
    deletecart,
    signupPage,
    addwishlist,
    checkoutpage,
    loginPage,
    historyPage,
    contactusPage,
    editProfilePage,
    wishlistPage,
    homepage,
    checkout,
    homepage,
    viewwishlist,
    deletewishlist,
    logout,
    aboutUsPage
};

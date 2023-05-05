const UserModel = require('../models/User.js')
const registerView = (req, res) => {
    res.render("register", {
    });
}

const loginView = (req, res) => {
    res.render("login", {
    });
}

const testController = async (req, res) => {
    console.log(req.body)

    const newUser = new UserModel(req.body)
    res.json(newUser)
    try {
        await newUser.save()
    }
    catch (err) {
        console.log(err)
    }
};

module.exports = {
    registerView,
    loginView,
    testController
};
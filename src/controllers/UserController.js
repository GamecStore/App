const UserModel = require('../models/User.js')


const userController = async (req, res) => {
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
    userController
};
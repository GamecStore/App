const UserModel = require('../models/Game.js')


const gameController = async (req, res) => {
    const newUser = new UserModel(req.body)
    res.json(newUser)
    try {
        await newUser.save()
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    gameController
}
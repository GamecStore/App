const UserModel = require('../models/User.js')

module.exports = (app) => {
    app.post('/testController', async (req, res) => {
        console.log(res.body)
        const newUser = new UserModel(req.body)
        await newUser.save();
        res.status(200).json({ "message": "hi" })
    })
}
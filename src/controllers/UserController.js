const UserModel = require('../models/User.js')

module.exports = (app) => {
    app.post('/testController', async (req, res) => {
        console.log(req.body)

        const newUser = new UserModel(req.body)
        res.json(newUser)
        try {
            await newUser.save()
        }
        catch (err) {
            console.log(err)
        }

    })
}
const UserModel = require('../models/Game.js')

module.exports = (app) => {
    app.post('/GameController', async (req, res) => {
        console.log(req.body)

        const newGame = new UserModel(req.body)
        res.json(newGame)
        try {
            await newGame.save()
        }
        catch (err) {
            console.log(err)
        }

    })
}
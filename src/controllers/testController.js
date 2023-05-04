module.exports = (app) => {
    app.get('/testController', async (req, res) => {
        const data = req.body
        const newUser = new UserModel(user)
        await newUser.save();
    })
}
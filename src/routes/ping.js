module.exports = (app) => {
    app.get('/ping', (req, res) => {
        res.status(200).json({
            message: 'pong'
        });
    });
}
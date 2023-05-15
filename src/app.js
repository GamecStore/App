const config = require('./config.json');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require("colors");

const app = express();
const port = config.port || 3000;
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/static', express.static('static'))


app.set('views', path.join(__dirname, 'views'));

mongoose.connect(config.mongoURI);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`[MONGO] Connected to MongoDB`.green);
});

const indexRouter = require('./routes/index')
const gamePageRouter = require('./routes/gamepage')
const regesteratioRoter = require('./routes/regestration')
const loginRoter = require('./routes/login')

app.get('/login', (req, res) => {
    res.render('pages/login')
})

app.use('/', indexRouter)

app.get('/gamepage/:id', gamePageRouter)

app.get('/regestration', (req, res) => {
    res.render('pages/regestration')

});

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/public/:dir/:file', (req, res) => {
    res.sendFile(`${__dirname}/public/${req.params.dir}/${req.params.file}`);
});

app.get('/:dir/:dir2/:file', (req, res) => {
    res.sendFile(`${__dirname}/public/${req.params.dir}/${req.params.dir2}/${req.params.file}`);
});


app.listen(port, () => {
    console.log(`[API] Server listening on port ${port}`.cyan);
});


require('./routes/ping')(app);
require('./routes/user')(app);
require('./routes/game')(app);


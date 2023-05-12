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

app.set('views', path.join(__dirname, 'views'));

mongoose.connect(config.mongoURI);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`[MONGO] Connected to MongoDB`.green);
});

const indexRouter = require('./routes/index')
const gamePageRouter = require('./routes/gamepage')

app.listen(port, () => {
    console.log(`[API] Server listening on port ${port}`.cyan);
});

app.use('/', indexRouter)

app.get('/gamepage', (req, res) => {
    res.render('pages/gamePage');
});

require('./routes/ping')(app);
require('./routes/user')(app);
require('./routes/game')(app);


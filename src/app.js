const config = require('./config.json');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require("colors");

const app = express();
const port = config.port || 3000;
app.set('view engine', 'ejs')
app.use(cors());
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));

mongoose.connect(config.mongoURI);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`[MONGO] Connected to MongoDB`.green);
});

app.listen(port, () => {
    console.log(`[API] Server listening on port ${port}`.cyan);
});

app.get('/', (req, res) => {
    res.sendStatus(200);
});


app.get('/gamepage', (req, res) => {
    res.render('gamePage');
});

require('./routes/ping')(app);
require('./routes/user')(app);
require('./routes/game')(app);
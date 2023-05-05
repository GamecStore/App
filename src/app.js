const config = require('./config.json');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("colors");

const app = express();
const port = config.port || 3000;

app.use(cors());
app.use(express.json());

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

require('./routes/ping')(app);
require('./controllers/UserController')(app);
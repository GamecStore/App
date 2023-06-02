const config = require('./config.json');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session')
const logger = require('morgan');
const fs = require('fs');

const app = express();
const port = config.port || 3000;
app.use(express.urlencoded({ extended: true }));

require("colors");

const ProductsRouter = require('./routes/products')
const AdminindexRouter = require('./routes/adminindex')
const CustomersRouter = require('./routes/customers')
const OrdersRouter = require('./routes/orders')
const AboutUsRouter=require('./routes/aboutUs')
const CheckoutRouter = require('./routes/checkout')
const ContactUsRouter = require('./routes/contactus')
const HistoryRouter = require('./routes/user')
const LibraryRouter = require('./routes/library')
const WishlistRouter = require('./routes/wishlist')
const allGamesRouter = require('./routes/allGames')
const AddingGamesRouter = require('./routes/addingGames')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')



app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/static', express.static('static'))
// to read from posts
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));


// used to log files
app.use(
    logger(":method :url :status :res[content-length] - :response-time ms")
);
// app.use(
//     logger("tiny", {
//         stream: fs.createWriteStream("/logs.access.log", { flags: "a" }),
//     })
// );

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

// mongoose.connect(config.mongoURI)
mongoose.connect(
    "mongodb+srv://home:home@cluster1.hlc2rvg.mongodb.net/AllGames?retryWrites=true&w=majority")
.then(() => console.log(`[MONGO] Connected to MongoDB`.green))
.catch((err) => console.log(`[MONGO] Error connecting to MongoDB: ${err}`.red));


// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log(`[MONGO] Connected to MongoDB`.green);
// });



app.use('/', require('./routes/index'))
app.use('/', require('./routes/game'))
app.use('/', require('./routes/game'));
app.use('/', require('./routes/user'));
app.use('/products', ProductsRouter)
app.use('/orders', OrdersRouter)
app.use('/customers', CustomersRouter)
app.use('/adminindex', AdminindexRouter)
app.use('/aboutUs',AboutUsRouter)
app.use('/contactus', ContactUsRouter)
app.use('/library', LibraryRouter)
app.use('/wishlist', WishlistRouter)
app.use('/history', HistoryRouter)
app.use('/checkout', CheckoutRouter)
app.use('/allgames', allGamesRouter)
app.use('/addingGames', AddingGamesRouter)

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


app.use((req, res) => {
    res.status(404).render('pages/ErrorPage');
})

app.listen(port, () => {
    console.log(`[API] Server listening on http://localhost:${port}`.cyan);
});

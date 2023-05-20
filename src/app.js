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
require("colors");

const ProductsRouter=require('./routes/products')
const AdminindexRouter=require('./routes/adminindex')
const CustomersRouter=require('./routes/customers')
const OrdersRouter=require('./routes/orders')
// const AboutUsRouter=require('./routes/aboutUs')
const CartRouter=require('./routes/cart')
const CheckoutRouter=require('./routes/checkout')
const ContactUsRouter=require('./routes/contactus')
const HistoryRouter=require('./routes/history')
const LibraryRouter=require('./routes/library')
const WishlistRouter=require('./routes/wishlist')
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



mongoose.connect(config.mongoURI).then(() => console.log(`[MONGO] Connected to MongoDB`.green)).catch((err) => console.log(`[MONGO] Error connecting to MongoDB: ${err}`.red));
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log(`[MONGO] Connected to MongoDB`.green);
// });



app.use('/', require('./routes/index'))
app.use('/', require('./routes/gamepage'))
app.use('/', require('./routes/game'));
app.use('/', require('./routes/user'));
app.use('/products',ProductsRouter)
app.use('/orders',OrdersRouter)
app.use('/customers',CustomersRouter)
app.use('/adminindex',AdminindexRouter)
app.use('/cart',CartRouter)
app.use('/aboutUs',AboutUsRouter)
app.use('/contactus',ContactUsRouter)
app.use('/library',LibraryRouter)
app.use('/wishlist',WishlistRouter)
app.use('/history',HistoryRouter)
app.use('/checkout',CheckoutRouter)

app.get('/signup', (req, res) => {
    res.render('pages/signup')
});

app.get('/allGames', (req, res) => {
    res.render('pages/allGames');
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


app.use((req, res) => {
    res.status(404).render('pages/ErrorPage');
})

app.listen(port, () => {
    console.log(`[API] Server listening on http://localhost:${port}`.cyan);
});

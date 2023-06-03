const config = require('./config.json');
// Express for handling GET and POST request
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session')
const logger = require('morgan');
const fs = require('fs');// Requiring file system to use local files
const bodyParser = require('body-parser');// Parsing the form of body to take input from forms
const multer = require('multer');
const port = config.port || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

require("colors");


app.use(express.urlencoded({ extended: true }));
// Configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



const ProductsRouter = require('./routes/products')
const AdminindexRouter = require('./routes/adminindex')
const CustomersRouter = require('./routes/customers')
const OrdersRouter = require('./routes/orders')
const AboutUsRouter = require('./routes/aboutUs')
const CheckoutRouter = require('./routes/checkout')
const ContactUsRouter = require('./routes/contactus')
const HistoryRouter = require('./routes/user')
const LibraryRouter = require('./routes/library')
const WishlistRouter = require('./routes/wishlist')
const allGamesRouter = require('./routes/allGames')
const AddingGamesRouter = require('./routes/addingGames')

const editProfileRouter = require('./routes/user')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('views', path.join(__dirname, 'views'));



app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/static', express.static('static'))



// used to log files
app.use(
    logger(":method :url :status :res[content-length] - :response-time ms")
);

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

mongoose.connect(config.mongoURI)
    .then(() => console.log(`[MONGO] Connected to MongoDB`.green))
    .catch((err) => console.log(`[MONGO] Error connecting to MongoDB: ${err}`.red));



// app.use('/', require('./routes/index'))
app.use('/', require('./routes/game'))
app.use('/', require('./routes/game'));
app.use('/', require('./routes/user'));
app.use('/products', ProductsRouter)
app.use('/orders', OrdersRouter)
app.use('/customers', CustomersRouter)
app.use('/adminindex', AdminindexRouter)
app.use('/aboutUs', AboutUsRouter)
app.use('/contactus', ContactUsRouter)
app.use('/library', LibraryRouter)
app.use('/wishlist', WishlistRouter)
app.use('/history', HistoryRouter)
app.use('/checkout', CheckoutRouter)
app.use('/allGames', allGamesRouter)
app.use('/addingGames', AddingGamesRouter)
app.use('/errorAdding', ErrorAddingRouter)
app.use('/editprofile', editProfileRouter)


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

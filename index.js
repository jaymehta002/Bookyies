const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const ejs = require('ejs');
const colors = require('colors');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const bookRoute = require('./routes/bookRoute');
const port = process.env.PORT || 3000;
const multer = require('multer');

const storage = multer.memoryStorage(); // You can also use disk storage if you want to save files to disk
const upload = multer({ storage: storage });
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    secret: "If you are seeing this, you are too damn close",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000*60*60*24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb+srv://jaymehta:jaymehta@portfolio.h76h5.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log(`Connected to databse Successfully`))
    .catch(err => console.log(err));

app.use('/', userRoute);
app.use('/', authRoute);
app.use('/', bookRoute);

app.use((req, res, next) => {
    res.status(404).render("404")
})

app.listen(port);

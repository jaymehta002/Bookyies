const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('cookie-session');
const passport = require('passport');
const ejs = require('ejs');
const colors = require('colors');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const bookRoute = require('./routes/bookRoute');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000*60*60*24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(`Connected to databse Successfully`))
    .catch(err => console.log(err));

app.use('/', userRoute);
app.use('/', authRoute);
app.use('/', bookRoute);

app.use((req, res, next) => {
    res.status(404).render("404")
})

app.listen(3000);

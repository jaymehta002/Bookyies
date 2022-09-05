const { model } = require('mongoose');
const Book = require('../models/Book');
const User = require("../models/User");
const router = require('express').Router();

router.get('/', async (req, res) => {
    if(req.isAuthenticated()) {
        const book = await Book.find().sort({createdAt: -1});
        res.render("home", {book})
    } else {
        res.render("index")
    }
});

router.get('/login', (req, res) => {
    if(req.isAuthenticated()) {
        res.redirect("/home")
    } else {
        res.render("login")
    }
});

router.get('/register', (req, res) => {
    if(req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render("register")
    }
});

router.get('/auth/logout', function(req, res, next) {

    req.logOut(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/profile', (req, res)=> {
    if(req.isAuthenticated()){
        const user = req.user._id;

        User.find({"_id" : user}, async function(err, foundUser) {
            if(err){
                console.log(err)
            } else {
                if(foundUser){
                    res.render("profile", {userProfile: foundUser});
                }
            }
        })
    } else {
        res.redirect("/")
    }
})

router.get('/about', (req, res)=> {
    res.render('about')
})


module.exports = router;
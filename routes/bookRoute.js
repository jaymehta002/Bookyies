const router = require('express').Router();
const Book = require('../models/Book');
const User = require('../models/User');

router.get('/post', (req, res) => {
    if(req.isAuthenticated()) {
        res.render("post");
    } else {
        res.render("index")
    }
})

router.post('/post/create', (req, res)=> {
    try{
        const user = req.user._id;

        const post = new Book({
            title: req.body.title,
            author: req.body.author,
            quote: req.body.quote,
            createdBy: req.user.username
        })
        const savePost = post.save();

        !savePost && res.redirect('/post')
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

router.get('/home', async (req, res) => {
    if(req.isAuthenticated()) {
        try {
            const allQuote = await Book.find();
            res.render("home", {allQuote, isAuth: req.isAuthenticated()});
        } catch (error) {
            res.send(error);
        }
    } else {
            res.redirect("/")}
    });
module.exports = router;
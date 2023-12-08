const router = require('express').Router();
const Book = require('../models/Book');
const User = require('../models/User');
const axios = require('axios');

router.get('/explore', async (req, res) => {
    try {
      const response = await axios.get(
        'https://openlibrary.org/subjects/programming.json?limit=10'
      );
  
      const books = response.data.works.map((work) => ({
        title: work.title,
        author: work.authors ? work.authors.map((author) => author.name).join(', ') : 'Unknown Author',
        description: work.subjects ? work.subjects.join(', ') : 'No subjects available',
      }));
  
      res.render('explore', { books });
    } catch (error) {
      console.error('Error fetching popular books:', error.message);
      res.status(500).json({ error: 'Internal Server Error' }).redirect('/');
    }
  });


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
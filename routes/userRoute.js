const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy());

passport.serializeUser(function(user, done){
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        done(err, user);
    });
});

router.post("/auth/register", async(req, res) => {
    try {
        const registerUser = await(User.register({fullName:req.body.fullName, phone:req.body.phone, username: req.body.username}, req.body.password));
        if(registerUser){
            passport.authenticate("local")(req, res, function() {
                res.redirect("/");
            })
        } else {
            res.redirect("/register")
        }
    } catch (error) {
        if(error.name = "UserExistsError")
            res.redirect("/register",);
        console.log(error)     
    }
});


router.post("/auth/login", (req, res)=> {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err)=>{
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect('/');
            });
        }
    });
});

router.post('/auth/logout', function(req, res, next) {
req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
});
});



module.exports = router

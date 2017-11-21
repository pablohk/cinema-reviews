const express = require('express');
const router = express.Router();
const passport =require ("passport");

const {ensureLoggedIn, ensureLoggedOut}= require('connect-ensure-login');


router.get('/home',ensureLoggedIn('/'), (req,res,next)=>{
  res.render('user/home');
});

router.get('/login', (req, res, next)=> {
  res.render('user/login', {message: req.flash("error")});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect:'/user/home',
  failureRedirect : '/user/login',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/signup',ensureLoggedOut('/'), (req,res, next) => {
  res.render('user/signup', {message: req.flash("error")});
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/user/login',
  failureRedirect : '/user/signup',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/logout', ensureLoggedIn('/'), (req,res)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;

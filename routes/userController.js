const express = require('express');
const router = express.Router();
const passport =require ("passport");
const {ensureLoggedIn, ensureLoggedOut}= require('connect-ensure-login');


router.get('/home', (req,res,next)=>{
  res.render('user/home');
});

router.get('/login', (req, res, next)=> {
  res.render('user/login');
});

router.post('/login', passport.authenticate('local-login', {
  successReturnToOrRedirect:'/user/home',
  failureRedirect : '/user/login',
  failureFlash: true
}));

router.get('/signup',ensureLoggedOut('/'), (req,res, next) => {
  res.render('user/signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/user/login',
  failureRedirect : '/user/signup',
   failureFlash: true
}));

router.get('/logout', ensureLoggedIn('/'), (req,res)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;

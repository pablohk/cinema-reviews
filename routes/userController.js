const express = require('express');
const router = express.Router();
const passport =require ("passport");
const User = require ('../models/User');
const {ensureLoggedIn, ensureLoggedOut}= require('connect-ensure-login');


router.get('/home',ensureLoggedIn('/user/login'), (req,res,next)=>{
  res.render('user/home');
});

router.get('/login', ensureLoggedOut('/user/home'),(req, res, next)=> {
  res.render('user/login', {message: req.flash("error")});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect:'/user/home',
  failureRedirect : '/user/login',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/signup',ensureLoggedOut('/user/home'), (req,res, next) => {
  res.render('user/signup', {message: req.flash("error")});
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/user/login',
  failureRedirect : '/user/signup',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/logout', ensureLoggedIn('/user/login'), (req,res)=>{
  req.logout();
  res.redirect('/');
});

router.get('/detail',ensureLoggedIn('/user/login'), (req,res,next)=>{
  User.findById(req.user._id)
  .then( (item)=>{
    console.log(item);
    res.render('user/detail', {item});})
  .catch ( (e)=> next(e));
});

router.get('/edit',ensureLoggedIn('/user/login'), (req,res,next)=>{
  User.findById(req.user._id)
  .then( (item)=>{
    console.log(item);
    res.render('user/edit', {item});})
  .catch ( (e)=> next(e));
});

router.post('/edit', ensureLoggedIn('/user/login'), (req,res,next)=>{
  const update={
    name:req.body.name,
    username:req.body.username,
    mail:req.body.mail,
    address:req.body.address};

  User.findByIdAndUpdate(req.user._id,update)
    .then( ()=> res.redirect('/user/home'))
    .catch( e=> next(e));
});

module.exports = router;

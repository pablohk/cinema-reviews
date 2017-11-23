const express = require('express');
const router = express.Router();
const Cine =  require ('../models/Cine');
const {ensureLoggedIn, ensureLoggedOut}= require('connect-ensure-login');

router.get('/list', ensureLoggedIn('/user/login'), (req,res,next)=>{
  Cine.find()
    .then(items=>{res.render('cine/cineList', {items});})
    .catch(err=>{res.render('cine/cineList',{error:err.message});
  });
});

router.get('/:id/detail', ensureLoggedIn('/user/login'), (req,res,next)=>{
  const id =req.params.id;
  Cine.findById(id)
    .then(item=>{res.render('cine/cineDetail', {item});})
    .catch(err=>{res.render('user/home',{message  : err.message});
  });
});


module.exports = router;

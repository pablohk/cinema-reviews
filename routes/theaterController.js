const express = require('express');
const router = express.Router();
const Theater =require('../models/Theater');

const API_KEY=process.env.API_KEY;

router.get('/list', (req, res, next)=>{
  Theater.find()
    .then(items=>{res.render('theater/theaterList', {items});})
    .catch(err=>{res.render('theater/theaterList',{error:err.message});
  });
});

router.get('/:id/detail', (req,res,next)=>{
  const id =req.params.id;
  Theater.findById(id)
    .then(item=>{res.render('theater/theaterDetail', {item, API_KEY});})
    .catch(err=>{res.render('user/home',{message  : err.message});
  });
});



module.exports = router;

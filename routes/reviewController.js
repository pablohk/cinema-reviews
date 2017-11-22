const express = require('express');
const router = express.Router();
const Review =require('../models/Review');
const User  = require('../models/User');
const Cine = require('../models/Cine');
const Theater =require('../models/Theater');
const EnsureLoggedIn = require('../config/middleware');


const EnsureOwnerReviewCine = (req,res,next) =>{
  Review.find({'_user_id':{$eq: req.user._id}})
  .then(rev =>{
    if(rev.length>0){
      rev.forEach(e=>{
        if(e._cine_id.equals(req.params.id)){
          throw new Error("YOu are the owner");
        }
      });
    };
      return next();
  })
  .catch(e => {
    console.error(e);
    res.redirect('/cine/list');
  });
};

const EnsureOwnerReviewTheater = (req,res,next) =>{
  Review.find({'_user_id':{$eq: req.user._id}})
  .then(rev =>{
    if(rev.length>0){
      rev.forEach(e=>{
        if(e._theater_id.equals(req.params.id)){
          throw new Error("YOu are the owner");
        }
      });
    };
      return next();
  })
  .catch(e => {
    console.error(e);
    res.redirect('/theater/list');
  });
};

router.get('/newRevCine/:id', (req,res,next)=>{
  res.render('review/newRevCine',{cineId:req.params.id});
});

router.post('/newRevCine/:id',[EnsureLoggedIn.EnsureLoggedIn,EnsureOwnerReviewCine], (req,res,next)=>{
  const {comment,rating}=req.body;
  const cineId=req.params.id;
  const newRev = new Review ({
    comment,rating,_user_id:req.user._id,_cine_id:cineId});

  newRev.save()
  .then(rev =>{
    Review.findByIdAndUpdate(rev._id)
      .populate('_user_id')
      .populate('_cine_id')
      .then(rev =>{
        res.render('review/reviewIndex',{rev});
      })
      .catch( e => next (e));
    })
  .catch(e=>{res.render('review/new');
  });
});



router.get('/newRevTheater/:id', (req,res,next)=>{
  res.render('review/newRevTheater',{theaterId:req.params.id});
});

router.post('/newRevTheater/:id',[EnsureLoggedIn.EnsureLoggedIn,EnsureOwnerReviewTheater], (req,res,next)=>{
  const {comment,rating}=req.body;
  const theaterId=req.params.id;
  const newRev = new Review ({
    comment,rating,_user_id:req.user._id,_theater_id:theaterId});

  newRev.save()
  .then(rev =>{
    console.log(rev);
    Review.findByIdAndUpdate(rev._id)
      .populate('_user_id')
      .populate('_theater_id')
      .then(rev =>{
        res.render('review/reviewIndex',{rev});
      })
      .catch( e => next (e));
    })
  .catch(e=>{res.render('review/new');
  });
});


router.get('/listByUser', (req, res) => {
    Review.find({'_user_id':{$eq: req.user._id}})
          .populate('_user_id')
          .then( rev => {
            console.log(rev);
            res.render('review/listByUser',{items:rev});
          })
          .catch(e => next(e));
  });


module.exports = router;

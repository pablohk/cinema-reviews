const express = require('express');
const router = express.Router();
const Review =require('../models/Review');
const User  = require('../models/User');
const Cine = require('../models/Cine');
const Theater =require('../models/Theater');
const EnsureLoggedIn = require('../config/middleware');


router.get('/newRevCine/:id', (req,res,next)=>{
  res.render('review/newRevCine',{cineId:req.params.id});
});

router.post('/newRevCine/:id',EnsureLoggedIn.EnsureLoggedIn, (req,res,next)=>{
  const {comment,rating}=req.body;
  const cineId=req.params.id;
  const newRev = new Review ({
    comment,rating,_user_id:req.user._id,_cine_id:cineId});
console.log(newRev);
  newRev.save()
  .then(rev =>{
    Review.findById(rev._id)
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

// router.get('/:id', (req, res) => {
//   Review.findById(req.params.id)
//           .populate('_user_id')
//           .then( rev => {
//             console.log(rev);
//             res.render('review/reviewIndex',{rev});
//           })
//           .catch(e => next(e));
//   });


module.exports = router;

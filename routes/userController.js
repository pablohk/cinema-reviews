var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', (req, res, next)=> {
  res.render('user/login');
});

router.get('/signup', (req,res, next) => {
  res.render('user/signup');
});




module.exports = router;

const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const bcrypt = require('bcrypt');
const ROLE = require('../models/roles');

module.exports = (app)=> {
// Creemos que hace falta el flash
  app.use(flash());

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ "_id": id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
        User.findOne({'username': username}, (err, user) => {
          if (err) {return next(err);}
          if (user) {return next(null, false);
          } else {
            // Destructure the body
            const {
              username,
              name,
              password,
              mail,
              address
            } = req.body;
            const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            const newUser = new User({
              username,
              name,
              mail,
              password: hashPass,
              address,
              role:ROLE[0]
            });

            newUser.save((err) => {
              if (err) {
                next(err);
              }
              return next(null, newUser);
            });
          }
        });
      });
    }));

  passport.use('local-login', new LocalStrategy((username, password, next) => {
    User.findOne({ username}, (err, user) => {
      if (err) {
        return next(err);}
      if (!user) {
        return next(null, false, {message: "Incorrect username"});}
      if (!bcrypt.compareSync(password, user.password)) {
        console.log('entra en 3');
        return next(null, false, {message: "Incorrect password"});
      }
      return next(null, user);
    });
  }));


};

require('dotenv').config();
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");
const passport = require('passport');

module.exports = (app) => {

  // Mongoose configuration
  const dbURL = process.env.dbURL;
  mongoose.connect(dbURL, {useMongoClient: true})
    .then(() => {debug(`Conected to ${dbURL}`);});

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());

  app.use(session({
    secret: 'Okay, proyect-2 alvaro&Pablo',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req,res,next) => {
    res.locals.title = "Cinema-reviews";
    res.locals.user = req.user;
    next();
  });


};

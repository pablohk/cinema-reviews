const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");


module.exports = (app) => {

  // Mongoose configuration
  const dbURL = "mongodb://localhost/cinema-reviews";
  mongoose.connect(dbURL, {useMongoClient: true})
    .then(() => {debug(`Conected to ${dbURL}`);});

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());

  app.use(session({
    secret: 'passport-roles',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }));

  app.use((req,res,next) => {
    res.locals.title = "Cinema-reviews";
    res.locals.user = req.user;
    next();
  });


};

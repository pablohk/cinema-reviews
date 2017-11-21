const index = require('../routes/indexController');
const user = require('../routes/userController');
const cine = require('../routes/cineController');
const theater =require('../routes/theaterController');
module.exports =(app)=>{
  app.use('/', index);
  app.use('/user', user);
  app.use('/cine',cine);
  app.use('/theater', theater);
};

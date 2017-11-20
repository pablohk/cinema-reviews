const index = require('../routes/indexController');
const user = require('../routes/userController');
module.exports =(app)=>{
  app.use('/', index);
  app.use('/user', user);
};

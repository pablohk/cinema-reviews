const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const ROLE = require('./roles');

const userSchema = new Schema ({
  username: {type : String},
  password: {type : String},
  name : {type : String},
  mail : {type : String},
  address: {type : String},
  role : {type : String, enum: ROLE}
},
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model('User',userSchema);
module.exports = User;

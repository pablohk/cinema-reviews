const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SERV = require('./services');

const TheaterSchema = new Schema ({
  name: {type : String},
  address:{
        province :{type: String},
        town :{type: String},
        street :{type: String}
      },
  url: {type : String},
  services : {type: String, enum : SERV},
  openingHours: {type: String},
  price: {type: Number},
  phone : {type: Number},
  seating :{type: Number},
},
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Theater = mongoose.model('Theater',TheaterSchema);

module.exports = Theater;

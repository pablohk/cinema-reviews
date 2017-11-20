const mongoose = require('mongoose');
const Schema = mongoose.schema();
const SERV = require('./services');

const cineSchema = new Schema ({
  name: {type : String},
  address: {type : String},
  url: {type : String},
  services : {type: String, enum : SERV},
  openingHours: {type: String},
  price: {type: Number},
  phone : {type: Number},
  rooms:{
        number :{type: Number},
        seating :{type: Number}
        }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model("Cine".cineSchema);

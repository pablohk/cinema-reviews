const mongoose = require('mongoose');
const Schema = mongoose.schema();

const reviewSchema = new Schema ({
  comment: {type : String},
  rating: {type : Number},
  _user_id: [{type:Schema.Types.ObjectId, ref:'User'}],
  _theater_id: [{type:Schema.Types.ObjectId, ref:'Theater'}],
  _cine_id: [{type:Schema.Types.ObjectId, ref:'Cine'}],
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});


module.exports = mongoose.model('Review', reviewSchema);

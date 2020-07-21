const Joi = require('joi');
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
     notification:{ type: String,
                   required: true,
                   unique:true},
    info:{ type: String},
    timestamp:{
       type: Date,
       // `Date.now()` returns the current unix timestamp as a number
       default: Date.now},
    plateform:{type: String,
               unique:true},
    audience:{type:String} 
});

const Genre = mongoose.model('notification', notificationSchema);

function validateGenre(genre) {
  const schema = {
    notification: Joi.string().min(3).required(),
    info: Joi.string().min(3).required(),
    plateform: Joi.string().min(3).required(),
    audience: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

exports.notificationSchema = notificationSchema;
exports.Genre = Genre; 
exports.validate = validateGenre;

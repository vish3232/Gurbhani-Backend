
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      //  _id: mongoose.Schema.ObjectId(),
    username:{
        type: String,
        required: true,
        unique:true },
    mobile_no:{
      type: Number,
      required: true}, 
    fname:{  type: String,
            required: true
         },
    lname:{
        type: String,
        required: true},    
    email: { 
      type: String,
      required: true,
      unique:true
     },
    password: { 
      type: String,
      required: true},
    timestamp:{
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now},
    loginType:{
      default:false
    }

});
userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isUser: this.isUser }, config.get('jwtPrivateKey'));
  return token;
}

module.exports = mongoose.model('User', userSchema);


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTranport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTranport({
    auth: {
      api_key:'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'
    }
  })
);

const User = require('../models/user.models');
const checkAuth = require('../middlewere/Auth')
const { getMaxListeners } = require('../models/user.models');

/**************************************************************
 * @ROUTE       - /user/signup
 * @METHOD      - POST  
***************************************************************/
router.post('/signup', (req, res, next) => {
  User.find({email:req.body.email})
  .exec()
  .then(user =>{
    if(user.length >=1){
      return res.status(409).json({
        massage:'mail already exits'
      });
    }else{
      bcrypt.hash(req.body.password, 10,(err,hash)=>{
        if(err){
          return res.status(500).json({
            error:err 
          });
        } else{
          const user = new User({
            // _id:   mongoose.Schema.Types.ObjectId(),
            username:req.body.username,
            mobile_no:req.body.mobile_no,
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:hash 
            }) ;
            user
            .save()
            .then(result =>{
              console.log(result);
              res.status(201).json({
                massage:'User created'
              });
            })

            .then(result => {
              return transporter.sendMail({
                to:req.body.email,
                from: 'Vishalpurane59@gmail.com',
                subject: 'Signup succeeded!',
                html: '<h1>You successfully signed up!</h1>'
              });
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error:err
              });
            });
      
      
          }
        });

    }
  })
 
 });
  // router.delete('/:userid',(req,res,next) =>{})

/**************************************************************
 * @ROUTE       - /user/login
 * @METHOD      - POST
***************************************************************/
router.post("/login",(req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then( User => {
       if (User.length<1){
         return res.status(404).json({
         massage:'mail not found,user doees\'t exit'
        });
      }
      bcrypt.compare(req.body.password,User[0].password,(err,result) =>{
      if(err){
        return res.status(401).json({
          massage:'login failed'
        });
      }
      if(result){
        const token=jwt.sign(
          {
            email:User[0].email,
            userId:User[0]._id
          },
          jwtPrivateKey='secret',
          {
            expiresIn:"1h"
          }
        );
         return res.status(200).json({
           massage:'login sucessful',
           token:token
         });
      }
      res.status(401).json({
        massage:'password mismatch'
       });
      });
     })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        err
      });
    });
     
    }
);

module.exports = router;

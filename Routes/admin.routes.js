const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');


const Admin = require('../models/admin.models');

/**************************************************************
 * @ROUTE       - /admin/signup
 * @METHOD      - POST  
***************************************************************/
router.post('/signup', (req, res, next) => {
    Admin.find({email:req.body.email})
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
            const user = new Admin({
              // _id:   mongoose.Schema.Types.ObjectId(),
              name:req.body.name,
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
   /**************************************************************
 * @ROUTE       - /admin/login
 * @METHOD      - POST
***************************************************************/
router.post("/login",(req, res, next) => {
  Admin.find({email: req.body.email})
  .exec()
  .then( Admin => {
     if (Admin.length<1){
       return res.status(404).json({
       massage:'mail not found,user doees\'t exit'
      });
    }
    bcrypt.compare(req.body.password,Admin[0].password,(err,result) =>{
    if(err){
      return res.status(401).json({
        massage:'login failed'
      });
    }
    if(result){
      const token=jwt.sign(
        {
          email:Admin[0].email,
          userId:Admin[0]._id
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
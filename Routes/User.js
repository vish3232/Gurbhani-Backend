const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../Models/User');
router.post('/signup',(req,res,next)=>{
User.find({Email:req.body.email}).exec().then(user=>{
    if(user.length>=1){
        return res.status(409).json({
            message:"Mail exists"
        })
    }else{
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                })
            }else{
                const user=new User({
                    user_id:new mongoose.Types.ObjectId(),
                    Username:req.body.username,
                    Mobile_No:req.body.mobileno,
                    Password:hash,
                    Name:req.body.name,
                    Email:req.body.email,
                    
                })
            }
        })
    }
})
})
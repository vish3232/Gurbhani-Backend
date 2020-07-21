const express=require('express')
const router=express.Router()
const Gist_Sahib_Singh=require('../Models/Gist_Sahib_Singh')
const mongoose=require('mongoose')
const multer=require('multer')
const csvtojson = require("csvtojson");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype === "text/csv"){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
const upload=multer({storage:storage,fileFilter:fileFilter})

router.post('/Gist_Sahib_Singh/fileUpload',upload.single('csvFile'),(req,res,next)=>{
    csvtojson()
    .fromFile(req.file.path)
    .then(csvData => {
      Gist_Sahib_Singh.collection.insertMany(csvData, function(err,r) {
      console.log(r)        
      })
     });
    res.send("CSV File Inserted Successfully...")
  
})

module.exports=router
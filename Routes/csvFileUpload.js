const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const multer=require('multer')

const csvtojson = require("csvtojson");
const SGGS=require('../Models/SGGS')
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

router.post("/csvFileUpload",upload.single('recfile'),(req,res,next)=>{
  
csvtojson()
  .fromFile(req.file.path)
  .then(csvData => {
    SGGS.collection.insertMany(csvData, function(err,r) {
    console.log(r)        
    })
   });
  res.send("CSV File Inserted Successfully...")
       

    
})

router.post('/Book',(req,res,next)=>{
    
   var id="P"+req.body.id
   
    if(req.body.id.toString().length==1){
        id="P000"+req.body.id
    }else if(req.body.id.toString().length==2){
        id="P00"+req.body.id
  
    }else if(req.body.id.toString().length==3){
        id="P0"+req.body.id
  
    }
    console.log(id)
   SGGS.find({PID:{$regex:id}}).then(data=>{
       if(data.lenght!=0){
        res.send(data)
 
       }else{
           res.send("Page not found...")
       }
       })
})

router.post('/search',(req,res,next)=>{
    console.log(req.body)
    SGGS.find({Gurbani_Gurmukhi:{$regex:req.body.word}}).then(data=>{
        res.send(data)
    })
})


module.exports=router
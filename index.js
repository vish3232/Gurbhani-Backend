const express=require('express')
const mongoose=require('mongoose')
const multer=require('multer')
const upload=multer({dest:'/uploads/'})
const cors=require('cors')
const bodyparser = require('body-parser')

const app=express()
//database connection
mongoose.connect('mongodb://localhost:27017/Gurabani-Book').then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
mongoose.Promise=global.Promise
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))
app.use('/api',require('./Routes/csvFileUpload'))
app.use('/api',require('./Routes/Gist_By_Sant_Singh'))
app.use('/api',require('./Routes/Gist_Hindi_by_Sant_Singh_Hindi'))
app.use("/api",require('./Routes/Gist_Sahib_Singh'))
app.use("/api",require('./Routes/users.routes'))
app.use("/api/admin",require('./Routes/admin.routes'))
app.use("/api",require('./Routes/payment.table'))
app.use("/api",require('./Routes/notification.router'))
app.listen(process.env.port || 4000,function(){
    console.log('now listening for request');
})
const port = process.env.PORT || 8000;
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyparser = require('body-parser')

const app=express()
//database connection
mongoose.connect('mongodb+srv://vishal:vishal50@cluster0-cyva8.mongodb.net/Gurbhani-Book?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  }).then(() => {
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
app.listen(port, () => {
    console.log('Running on port 4000')
})
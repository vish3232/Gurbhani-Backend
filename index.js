const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyparser = require('body-parser')
require('dotenv').config()
const config = require('config');



const app=express()
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }

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
app.use("/api",require('./Routes/notification.router'))
app.use("/api",require('./Routes/payment.table'))
const port = process.env.PORT || 8000;
require('dotenv').config();
app.get('/', (req, res) => {
    res.send(process.env.PORT);
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})

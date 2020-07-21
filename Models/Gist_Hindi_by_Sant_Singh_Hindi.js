const mongoose=require('mongoose')
const Gist_Hindi_by_Sant_Singh_Hindi=mongoose.Schema({
    PID:{
        type:String
    },
    Gist_Hindi_by_Sant_Singh:{
        type:String
    }
})

module.exports=mongoose.model("Gist_Hindi_by_Sant_Singh_Hindi",Gist_Hindi_by_Sant_Singh_Hindi)
const mongoose=require('mongoose')
const Gist_By_Sant_Singh=mongoose.Schema({
    PID:{
        type:String
    },
    Gist_English_by_Sant_Singh:{
        type:String
    }
})

module.exports=mongoose.model("Gist_By_Sant_Singh",Gist_By_Sant_Singh)
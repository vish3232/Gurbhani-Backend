const mongoose=require('mongoose')
const { model } = require('./SGGS')
const Gist_Sahib_Singh=mongoose.Schema({
    PID:{
        type:String
    },
    Trans_Hindi_by_Sahib_Singh:{
        type:String
    },
    Note_by_Sahib_Singh:{
        type:String
    },
    Bhaav_by_Sahib_Singh:{
        type:String
    },
    PadArath_by_Sahib_Singh:{
        type:String
    }
})
module.exports=mongoose.model("Gist_Sahib_Singh",Gist_Sahib_Singh)
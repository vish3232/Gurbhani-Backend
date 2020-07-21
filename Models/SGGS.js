const mongoose=require('mongoose');
const SGGSSchema=mongoose.Schema({
    PID:{
        type:String
    },
    Gurbani_Gurmukhi:{
        type:String
    },
    Gurbani_Roman:{
        type:String
    },
    Gurbani_Hindi:{
        type:String
    },
    Raag:{
        type:String
    },
    Author:{
        type:String
    }
})
module.exports = mongoose.model('SGGS Book',SGGSSchema)
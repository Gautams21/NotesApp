const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    isPinned:{
        type:Boolean,
        default:false
    },
    userID:{
       type:String,
       required:true
    },
    createdAt:{
        type:Date,
        default:new Date().getTime()
    }
})

module.exports=mongoose.model('notes',Schema);
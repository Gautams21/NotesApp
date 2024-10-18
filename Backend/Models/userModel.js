const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:new Date().getTime()
    }
});

module.exports=mongoose.model('user',Schema);

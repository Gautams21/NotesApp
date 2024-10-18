const mongoose=require('mongoose');
require('dotenv').config();

const Connection=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Db connected')
    }).catch((error)=>{
     console.log(error);
    })
}
Connection;
module.exports=Connection();
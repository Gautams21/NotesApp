const express=require('express');
const app=express();
const cors=require('cors');
const Data=require('./Database');
const User=require('./Routes/User');
const Notes=require('./Routes/Notes');
app.use(cors());
require('dotenv').config();
app.use(express.json());
app.use('/',User);
app.use('/',Notes);

Data;
app.listen(process.env.PORT||4000,()=>{
console.log(`server listening to the port:${process.env.PORT}` )
})
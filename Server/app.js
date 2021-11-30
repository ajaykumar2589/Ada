const express= require('express');
const dotenv= require('dotenv');
const mongoose= require('mongoose');
const app = express();
dotenv.config({path:'./config.env'});

app.use(express.json());
require('./db/conn');
//we linked our roter files
app.use(require('./router/auth'));
const PORT=process.env.PORT;
// const User=require('./model/userInfo');
//Middleaware

 
const middleaware=(res,req,next)=>{
    console.log(`hello this my middleware`);
    next();

}
// middleaware();
// app.get('/',(req,res)=>{
//     res.send(`Hello world from sever`);

// });
app.get('/aboutus',(req,res)=>{
    res.send(`Hello world from sever aboutus`);

});
app.get('/home',(req,res)=>{
    res.send(`Hello world from sever home `);

});
app.get('/profile',middleaware,(req,res)=>{
    res.send(`Hello world from sever profile `);

});
app.get('/signin',(req,res)=>{
    res.send(`Hello world from sever signin `);

});
app.get('/signup',(req,res)=>{
    res.send(`Hello world from sever signup `);

});

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);

})

 
console.log(`hello world from sever`);
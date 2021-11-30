const express = require('express');
const bcrypt=require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('../db/conn');
const User = require('../model/userInfo');
router.get('/', (req, res) => {
    res.send(`hello world from server router js`);
})
//Using promises
// router.post('/register', (req, res) => {
//     const { name, email, phone, password, cpassword } = req.body;
//     if (!name || !email || !phone || !password || !cpassword) {
//         return res.status(422).json({ error: 'Pls fill the field properly' });
//     }
//     User.findOne({ email: email }).then((userExit) => {
//         if (userExit) {
//             return res.status(422).json({ error: 'Email already Exist' });
//         }
//         const user = new User({ name, email, phone, password, cpassword });
//         user.save().then(() => {
//             res.status(201).json({ message: 'registeration successfull' });
//         }).catch((error) => res.status(500).json({ error: "Failed register" }))

//     }).catch(error => { console.log(error); });
    
//     // res.send(`register page`);
// })
//Asyn await
//Register router
router.post('/register', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: 'Pls fill the field properly' });
    }
    try{
      const userExit= await User.findOne({ email: email });
      if (userExit) {
        return res.status(422).json({ error: 'Email already Exist' });
    }else if(password!=cpassword){
        return res.status(422).json({ error: 'password need to be same' });
    }
    const user = new User({ name, email, phone, password, cpassword });
    //we need to  hash passward
    await user.save();
    res.status(201).json({ message: 'registeration successfull' });
        

    }catch(err){
console.log(err);

    }
   
    
    // res.send(`register page`);
})
//Login router
router.post('/login', async  (req, res)=>{
   
    try{
        
        const {email,password} = req.body;
        if(!email ||!password){
            return res.status(400).json({error:"Pls fill the data"});
        }
        const userExit= await User.findOne({ email: email });
        if(userExit){
            const  isMatch= await bcrypt.compare(password, userExit.password);
            const token=await userExit.generateAuthToken();
            //storing token in cookie
            res.cookie("jwtoken",token,{  
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
         
            
            if(isMatch){
                res.json({message:"user login suceesfully"});}
                else{
                    res.json({error:"Invalid input"});
                }
            }
        else{
            res.json({error:"Invalid input"});
        }
        console.log(userExit);

    }
    catch(err){
console.log(err);
    }
})
module.exports = router;
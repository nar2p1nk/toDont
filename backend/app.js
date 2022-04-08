const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('./model');
require('./auth')
const expressjwt = require('express-jwt');
const sqlite = require('better-sqlite3');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.post('/log/login',(req,res)=>{
passport.authenticate(
    'login',
    (err,user,info)=>{
        console.log('app post')
        try{
            if(!user){
                const error = new Error('An error has ocor');
                console.log(info.message)
                res.json({message:info.message})
            }
            console.log('user confirmed')
            req.login(
                user,
                {session:false},
                (err)=>{
                    if(error) return res.status(400).json({error:err});
                    const body = {id:user.id,username:user.username};
                    const token = jwt.sign(body,'gila');
                    return res.json({token})
                }
            )
        }
        catch{}
    }
)
})




app.listen(8080,()=>{
    console.log('listening at localhost:8080/')
})

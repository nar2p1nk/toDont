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


app.get('/',(req,res)=>{
    res.json({status:200})
})


app.post('/login',(req,res,next)=>{
    console.log('middleware')
passport.authenticate(
    'login',
    (err,user,info)=>{
        console.log('app post')
        try{
            if(!user){
                const error = new Error('An error has ocor');
                console.log(info.message)
                res.json({message:info.message})
                return next(err)
            }
            console.log('user confirmed')
            req.login(
                user,
                {session:false},
                (err)=>{
                    if(err) return next(err)
                    const body = {id:user.id,username:user.username};
                    const token = jwt.sign(body,'gila');
                    return res.json({token})
                }
            )
        }
        catch(err){return(next(err))}
    }
)
    console.log('middleware after')
})//,(req,res))




app.listen(8080,()=>{
    console.log('listening at localhost:8080/')
})

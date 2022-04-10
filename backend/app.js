const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('./model');
require('./auth')
const expressjwt = require('express-jwt');
const sqlite = require('better-sqlite3');
const routes = require('./routes');
const app = express();

//app.use(expressjwt({secret:'gila',algorithms:['HS256']}))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use('/routes',routes)


app.get('/',(req,res)=>{
    const token = jwt.sign('egg', 'gila')
    res.json({token})
})


app.post(
    '/login',
    (req,res,next)=>{
        passport.authenticate(
            'logan',
            (err,user,info)=>{
                try{
                    console.log('trying')
                    if(!user){
                        const error = new Error('An erroe has ocor');
                        console.log(error)
                        res.json({message:info.message})
                        return next(error)
                    };
                    req.login(
                        user,
                        {session:false},
                        error=>{
                            if(error){console.log('if error');
                                return next(error)}
                            console.log(user.id,user.username)
                            const body = {id:user.id,username:user.username}
                            const token = jwt.sign(body,'gila')
                            return res.json({token})
                        }
                    )
                }
                catch{}
            }
        )
    }
)



app.listen(8080,()=>{
    console.log('listening at localhost:8080/')
})

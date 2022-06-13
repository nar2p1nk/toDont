const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('./model');
require('./auth')
const expressjwt = require('express-jwt');
const {findTodoByuserId} = require('./model');
const app = express();

//app.use(expressjwt({secret:'gila',algorithms:['HS256']}))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

const secure = expressjwt({secret:'gila',algorithms:['HS256']});


app.get(
    '/',
    secure,
    (req,res)=>{
        res.json({
            id:req.user.id,
            username:req.user.username
          })
})

app.get('/todo',
    secure,
    (req,res)=>{
        res.redirect('/todo/' + req.user.id)
})

app.get('/todo/:userId',
    secure,
    (req,res)=>{
        if(req.params.userId != req.user.id){
            req.params.userId = req.user.id
        }
        const todo = findTodoByuserId(req.params.userId)
        res.json(todo)
})




app.post(
    '/login',
    (req,res,next)=>{
        passport.authenticate(
            'login',
             (err,user,info)=>{
                try{
                    if(!user){
                        const error = new Error('An error has occurred')
                        res.json({message:info.message})
                        return next(error)
                    }
                    req.login(
                        user,
                        {session:false},
                         (err) =>{
                            if(err) return next(err);
                             console.log(user.id,user.username)
                            const body = {id:user.id,username:user.username};
                             req.user = body;
                            const token = jwt.sign(body,'gila');
                            return res.json({token});
                        }
                    );
                }
                catch(err){return next(err)}
            }
    )(req,res);
    }
)






app.listen(8080,()=>{
    console.log('listening at localhost:8080/')
})

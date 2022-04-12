const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('./model');
require('./auth')
const expressjwt = require('express-jwt');
const sqlite = require('better-sqlite3');
const routes = require('./routes');
const {findTodoByuserId} = require('./model');
const app = express();

//app.use(expressjwt({secret:'gila',algorithms:['HS256']}))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//app.use(expressjwt({secret:'gila',algorithms:['HS256']}))

app.get(
    '/',
  expressjwt({secret:'gila',algorithms:['HS256']}),
    (req,res)=>{
    res.json({
        id:req.user.id,
        username:req.user.username
    })
})

app.get('/todo/:userId',(req,res)=>{
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

// THIS CODE DOESN'T WORK, FIND OUT WHY
//
//app.post('/login',(req,res,next)=>{
//    console.log('middleware')
//passport.authenticate(
//    'login',
//    (err,user,info)=>{
//        console.log('app post')
//        try{
//            if(!user){
//                const error = new Error('An error has ocor');
//                console.log(info.message)
//                res.json({message:info.message})
//                return next(error)
//            }
//            console.log('user confirmed')
//            req.login(
//                user,
//                {session:false},
//                (err)=>{
//                    if(err) return next(err)
//                    console.log(user.id,user.username)
//                    const body = {id:user.id,username:user.username};
//                    const token = jwt.sign(body,'gila');
//                    return res.json({token})
//                }
//            )
//        }
//        catch(err){return(next(err))}
//    }
//)
//    console.log('middleware after')
//})//,(req,res))





app.listen(8080,()=>{
    console.log('listening at localhost:8080/')
})

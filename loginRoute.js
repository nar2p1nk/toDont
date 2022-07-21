const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post(
    '/login',
    (req,res,next)=>{
        passport.authenticate(
            'login',
             (err,user,info)=>{
                try{
                    if(!user){
                        const error = new Error('An error has occurred')
                        res.json({errMessage:info.message})
                        return next(error)
                    }
                    req.login(
                        user,
                        {session:false},
                         (err) =>{
                            if(err) return next(err);
                            const body = {
                                id:user.userId,
                                username:user.username
                            };
                             req.user = body;
                             console.log(req.user,body)
                             const token = jwt.sign(body,'gila');
                             res.cookie('jwt',token,{
                                 httpOnly:true,
//                                 secure:true,
                                 maxAge: 3600000
                             })
                             return res.json({token:token});
                        }
                    );
                }
                catch(err){return next(err)}
            }
    )(req,res);
    }
)

module.exports = router;

const express = require('express')
const passport = require('passport');
const router = express.Router()


router.post(
    '/login',
    (req,res,next)=>{
        passport.authenticate(
            'login',
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

module.exports = router

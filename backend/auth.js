const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userC = require('./model');
const bcrypt = require('bcrypt');
passport.use(
    'login',
    new localStrategy(
        {
            usernameField:'username',
            passwordField:'password'
        },
        (username,password,done)=>{
            try{
                const user = userC.findUserByUsername(username)
                if(!user){
                    return done(null,false,{message:'no user found'})
                }

                const validate = bcrypt.compareSync(password, user.password)
                if(!validate)return done(null,false,{message:'wrong password'})
                return done(null,false,{message:'user authenticated'})

            }
            catch(e){return done(e)}
        }
    )
)

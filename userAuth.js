const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
require('./database');


function init(passport){
    function auth(username,password,done){
        db.get(`SELECT Id,username,password FROM user WHERE username = ?`,[username],
           async (err,row)=>{
                if(row == null){
                    return done(null,false,{message:'user not found'})
                }
                try{
                    if(await bcrypt.compare(password,row.password)){
                        return done(null,row)
                    }
                    else{
                        console.log('incorrect password')
                        return done(null,false,{message:'incorrect password'})
                    }
                }
                catch(e){return done(e)}
            })
    }
    passport.use(new passportLocal(auth))
    passport.serializeUser(function(row,done){
        process.nextTick(()=>{
            done(null,{id:row.Id,username:row.username});
        });
    });
    passport.deserializeUser((row,done)=>{
        process.nextTick(()=>{
            return done(null,row);
        })
    })
}

module.exports = init

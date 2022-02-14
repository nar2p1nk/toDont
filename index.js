const express = require('express');
const sqlite = require('sqlite3');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
const init = require('./userAuth');
const flash = require('express-flash');
require('./database');
const app = express();
//app.use(flash)
init(passport)

var SQLiteStore = require('connect-sqlite3')(session);

app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

app.use('/static',express.static('static'))

app.use(session({
    secret: 'bleeding eyes',
    resave:false,
    saveUninitialized:false,
    store: new SQLiteStore({db: 'sessions.db',dir:'./'})
}))

app.use(passport.authenticate('session'));

app.get('/',checkAuth,(req,res)=>{
    res.send(req.user)
})

app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login')
})

app.get('/login',checkNotAuth,(req,res)=>{
    res.render('login.ejs')
})
app.post('/login',passport.authenticate('local',{
    successRedirect:'/ass',
    failureRedirect:'/login',
    failureFlash:false
}))

//app.post('/login',(req,res)=>{
//    console.log('poll')
//})


//app.post('/login',(req,res)=>{
//    console.log('poll')
//})

function checkAuth(req,res,next){
    if(req.isAuthenticated){
        return next()
    }
    else{
        console.log('can\'t go here, not logged in')
        res.redirect('/login')
    }
}

function checkNotAuth(req,res,next){
    if(req.isAuthenticated){
        console.log('can\'t go here, you\'re logged in')
        res.redirect('/')
    }
    else{return next()}
}

app.listen(8080,()=>{
    console.log('server at localhost:8080')
})



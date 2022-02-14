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

app.get('/home',(req,res)=>{
    res.send('suck dick')
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
})
app.post('/login',passport.authenticate('local',{
    successRedirect:'/ass',
    failureRedirect:'/login',
    failureFlash:false
}))

//app.post('/login',(req,res)=>{
//    console.log('poll')
//})


app.listen(8080,()=>{
    console.log('server at localhost:8080')
})



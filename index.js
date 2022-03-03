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
app.use(flash())
app.use(passport.initialize())

app.use(passport.authenticate('session'));

app.get('/',checkAuth,(req,res)=>{
    res.redirect('/user/' + req.user.id)
})

app.get('/user/:userId',checkAuth,(req,res)=>{
    const id = req.params.userId;
    if(id != req.user.id){
        res.redirect(`/user/${req.user.id}`)
    }
    else{
    db.all(`SELECT * FROM todos WHERE userId = ?`,[id],(err,rows)=>{
        res.render('main.ejs',{data:rows})
    })
    }
})

app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login')
})

app.get('/login',checkNotAuth,(req,res)=>{
    res.render('login.ejs')
})
app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))

app.post('/',(req,res)=>{
    db.run(`INSERT INTO todos VALUES(?)`,[req.body.todo],()=>{console.log(`insert into database todo ${req.body.todo}`)})
})

//app.post('/login',(req,res)=>{
//    console.log('poll')
//})


//app.post('/login',(req,res)=>{
//    console.log('poll')
//})

function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    
        console.log('can\'t go here, not logged in')
        res.redirect('/login')
    
}

function checkNotAuth(req,res,next){
    if(req.isAuthenticated()){
        console.log('can\'t go here, you\'re logged in')
        res.redirect('/')
    }
    return next()
}

app.listen(8080,()=>{
    console.log('server at localhost:8080')
})



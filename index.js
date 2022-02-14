const express = require('express');
const ejs = require('ejs');

const app = express()

app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

app.use('/static',express.static('static'))

app.get('/home',(req,res)=>{
    res.send('suck dick')
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/login',(req,res)=>{
    console.log(req.body.username,req.body.password)
    res.redirect('/home')
})




app.listen(8080,()=>{
    console.log('server at localhost:8080')
})



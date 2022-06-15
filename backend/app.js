const bodyParser = require('body-parser');
const express = require('express');
require('./auth')
const expressjwt = require('express-jwt');
const model = require('./model');
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

const secure = expressjwt({secret:'gila',algorithms:['HS256']});


app.post('/signup',(req,res)=>{
    model.createUser(req.body.username,req.body.password);
    res.json({'user has been created':req.body.username});
})

const loginRoute = require('./loginRoute');
app.use(loginRoute)



app.get(
    '/',
    secure,
    (req,res)=>{
        res.json(req.user)
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
        const todo = model.findTodoByuserId(req.params.userId)
        console.log(todo)
        res.json(todo)
})

app.post('/todo/create',
    secure,
    (req,res)=>{
        if(req.body.todo == 0 || req.body.todo == undefined ){
            res.json('please type something')
            return;
        }
        model.createtodo(req.body.todo,req.user.id)
        const todo = [req.body.todo,req.user.id]
        res.json(todo)
})

app.post('/todo/complete',
    secure,
    (req,res)=>{
        const idsToComplete = req.body.list;
        for(let id in idsToComplete){
            model.completeTodo(idsToComplete[id])
        }
        res.json({todos:'completed'})
    }
)


app.post('/todo/delete',
    secure,
    (req,res)=>{
        const idsToDelete = req.body.list;
        for(let id in idsToDelete){
            model.deleteTodo(idsToDelete[id])
        }
        res.json({todos:'deleted'})
    }
)



app.listen(8080,()=>{
    console.log('listening at localhost:8080/')
})

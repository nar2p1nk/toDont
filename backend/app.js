const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
require('./auth')
const expressjwt = require('express-jwt');
const model = require('./model');
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(cors())

const secure = expressjwt({secret:'gila',algorithms:['HS256']});






app.post('/signup',(req,res)=>{
    const user = [req.body.username,req.body.password];
    if(user[0].length === 0){
        res.json({errMessage:'Please enter a username'})
        return;
    }
    if(user[1].length === 0){
        res.json({errMessage:'Please enter password'});
        return;
    }
    model.createUser(user[0],user[1]);
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

//app.get('/todo',
//    secure,
//    (req,res)=>{
//        res.redirect('/todo/' + req.user.id)
//})

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
        model.createtodo(req.body.todo,req.user.id)
        const todos = model.findTodoByuserId(req.body.userId);
        res.json(todos)
})

app.post('/todo/complete',
    secure,
    (req,res)=>{
        const idsToComplete = req.body.list;
        for(let id in idsToComplete){
            model.completeTodo(idsToComplete[id])
        }
        const todos = model.findTodoByuserId(req.body.userId)
        res.json(todos)
    }
)


app.post('/todo/delete',
    secure,
    (req,res)=>{
        const idsToDelete = req.body.list;
        for(let id in idsToDelete){
            model.deleteTodo(idsToDelete[id])
        }
        const todos = model.findTodoByuserId(req.body.userId)
        res.json(todos)
    }
)

app.get('/header',
    secure,
    (req,res)=>{res.json(req.header('Authorization'))}
)


app.get('/cookie',
    secure,
    (req,res)=>{res.json(req.cookies)}
)


app.listen(8080,()=>{
    console.log('listening at localhost:8080/')
})

import './style/main.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';


const Main = () => {

    const [todoText,setTodoText] = useState('');
    const [todosToComplete,setTodosToComplete] = useState([]);
    const [todosToDelete,setTodosToDelete] = useState([]);
    const token = sessionStorage.getItem('jwtToken');
    const [todos,setTodos] = useState([])
    let navigate = useNavigate();
useEffect(()=>{
    let decodedToken;
    if(token === null){
        navigate('/login')
        return;
    }
    else{decodedToken = jwtDecode(token)}
    axios.get(
        '/todo/' + decodedToken.id,
        {headers:{Authorization: 'Bearer ' + token}}
)
        .then((res)=>{
            console.log(res.data)
            setTodos(res.data)
            console.log(todos)
            return;
        })


    return;
},[])

    function onChangeTodoText(e){
        setTodoText(e.target.value)
    }

    function submitTodo(e){
        if(e.key === 'Enter' || e.target.value === 'submit'){
            if( todoText.length < 1){console.log('type something'); return;}
        const decodedToken = jwtDecode(token);
        e.preventDefault()
        console.log('post',todoText)
        axios.post('/todo/create',
            {
                todo:todoText,
                userId:decodedToken.id,
            },
            {headers:{Authorization: 'Bearer ' + token}}
        )
            .then((res)=>{
                console.log(res)
                setTodos(res.data)
                setTodoText('')
            })
        }
    }

    function handleCheckTodo(e,useState,setUseState){
        if(e.target.checked === true){
            const todosId = [...useState,e.target.value];
            setUseState(todosId);
            console.log(useState);
        }
        else{if(e.target.checked === false){
            const newTodos = useState;
            const id = newTodos.indexOf(e.target.value);
            newTodos.splice(id,1);
            setUseState(newTodos);
            console.log('uncheck',useState)
        }}
    }

    function handleCompleteTodo(){
        if(todosToComplete.length < 1){console.log('todosToComplete is empty'); return;}
        const decodedToken = jwtDecode(token);
        console.log(todosToComplete);
        axios.post('/todo/complete',
            {list:todosToComplete,userId:decodedToken.id},
            {headers:{Authorization:'Bearer ' + token }}
        )
            .then((res)=>{setTodos(res.data);setTodosToComplete([])})
    }

    function handleDeleteTodo(){
        if(todosToDelete < 1){console.log('todosToDelete is empty');return;}
        const decodedToken = jwtDecode(token);
        console.log(todosToDelete);
        axios.post('/todo/delete',
            {list:todosToDelete,userId:decodedToken.id},
            {headers:{Authorization:'Bearer ' + token}}
        )
            .then((res)=>{setTodos(res.data);setTodosToDelete([])})
    }

    return (
        <div className="container">
            <div className='main'>
                <div className="todos-title">
                    <h2 className="header2 completed">Uncompleted</h2>
                    <h2 className="header2 uncompeleted">Completed</h2>
                </div>
                <div className='todos'>
                    <div className="uncompleted-div">
                        <div className="inputDiv uncompleted">
                            <input className="input todo"
                                placeholder='enter todo'
                                type="text"
                                value={todoText}
                                onChange={(event)=> onChangeTodoText(event)}
                                required={true}
                                onKeyPress={submitTodo}
                            />
                            
                                <button className="button todo" value='submit' onClick={submitTodo}>Post</button>

                            <button className="button todo" onClick={handleCompleteTodo}>
                            Complete selected todos
                            </button>
                        </div>
                        <div className='todos-list list-uncompleted'>
                        {todos.map(todo =>{
                            if(todo.completed === 1){return null;}
                            return(
                                <div className='todo-div completed' key={todo.todoId}>
                                    <div className='todo-checkbox-div'>
                                        <input
                                            className='todo-checkbox'
                                            type="checkbox"
                                            value={todo.todoId}
                                            onChange={(e)=>{handleCheckTodo(e,todosToComplete,setTodosToComplete)}} />
                                    </div>
                                    <p className='todo-parag'>{todo.todo}</p>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                <div className='completed-div'>
                    <div className='todos-list list-completed'>
                {todos.map(todo =>{
                    if(todo.completed === 0){return null;}
                    return(
                        <div className='todo-div uncompleted' key={todo.todoId}>
                            <div className='todo-checkbox-div'>
                                <input
                                    className='todo-checkbox'
                                    type='checkbox'
                                    value={todo.todoId}
                                    onChange={(e)=>{handleCheckTodo(e,todosToDelete,setTodosToDelete)}}/>
                            </div>
                            <p className='todo-parag'>{todo.todo}</p>
                        </div>
                    )
                })}
                    </div>
                    <div className="inputDiv completed">
                        <button className="button todo" 
                        onClick={handleDeleteTodo}>Delete selected todos</button>
                    </div>
                </div>
                </div>
        </div>
        </div>
        
    )
}

export default Main

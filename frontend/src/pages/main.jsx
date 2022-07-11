import './style/main.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';


const Main = () => {

    const [todoText,setTodoText] = useState('');
    const [todosToComplete,setTodosToComplete] = useState([]);
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
        'http://localhost:8080/todo/' + decodedToken.id,
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
        const decodedToken = jwtDecode(token);
        e.preventDefault()
        console.log('post',todoText)
        axios.post('http://localhost:8080/todo/create',
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

    function handleCheckTodo(e){
        if(e.target.checked === true){
            const todosId = [...todosToComplete,e.target.value];
            setTodosToComplete(todosId);
            console.log(todosToComplete);
        }
        else{if(e.target.checked === false){
            const newTodos = todosToComplete;
            const id = newTodos.indexOf(e.target.value);
            newTodos.splice(id,1);
            setTodosToComplete(newTodos);
            console.log('uncheck',todosToComplete)
        }}
    }

    function handleCompleteTodo(){
        const decodedToken = jwtDecode(token);
        console.log(todosToComplete);
        axios.post('http://localhost:8080/todo/complete',
            {list:todosToComplete,userId:decodedToken.id},
            {headers:{Authorization:'Bearer ' + token }}
        )
            .then((res)=>{setTodos(res.data)})
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
                        <div className='list-todosUncompleted'>
                        {todos.map(todo =>{
                            if(todo.completed === 1){return null;}
                            return(
                                <div className='todo-div completed' key={todo.todoId}>
                                    <input type="checkbox" value={todo.todoId} onChange={handleCheckTodo} />
                                    <p>{todo.todo}</p>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                <div className='completed-div'>
                {todos.map(todo =>{
                    if(todo.completed === 0){return null;}
                    return(
                        <div className='todo-div uncompleted' key={todo.todoId}>
                            <input type='checkbox'/>
                            <p>{todo.todo}</p>
                        </div>
                    )
                })}
                    <div className="inputDiv completed">
                        <button className="button todo">Delete selected todos</button>
                    </div>
                </div>
                </div>
        </div>
        </div>
        
    )
}

export default Main

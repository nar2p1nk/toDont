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
            })
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
                            <form onSubmit={submitTodo}>
                            <input className="input todo"
                                placeholder='enter todo'
                                type="text"
                                onChange={(event)=> onChangeTodoText(event)}
                                required={true}
                            />
                            <br/>
                            <button className="button todo" value='submit'>Post</button>
                            <button className="button todo">
                            Complete selected todos
                            </button>
                            <button className="button todo">Check all</button>
                        </form>
                        </div>
                        <div className='list-todosUncompleted'>
                        {todos.map(todo =>{
                            if(todo.completed === 1){return null;}
                            return(
                                <div className='todo-div completed' key={todo.todoId}>
                                    <input type="checkbox" />
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
                        <button className="button todo">Check all</button>
                    </div>
                </div>
                </div>
        </div>
        </div>
        
    )
}

export default Main

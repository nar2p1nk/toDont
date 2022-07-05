import './style/main.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';


const Main = () => {
    const token = sessionStorage.getItem('jwtToken');
    console.log('main',token)
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
    return (
        <div className="container">
            <div className='main'>
                <div className="todos-title">
                    <h2 className="header2 completed">Completed</h2>
                    <h2 className="header2 uncompeleted">Uncompleted</h2>
                </div>
                <div className='todos'>
                    <div className="completed-div">
                        <div className="input">
                            <input className="input todo"
                                placeholder='enter todo'
                                type="text" />
                            <button className="button todo">Post</button>
                            <button className="button todo">
                            Complete todo
                            </button>
                            <button className="button todo">Check all</button>
                        </div>
                        {todos.map(todo =>{
                            if(todo.completed === 0){return null;}
                            return(
                                <div className='todo completed'><p key={todo.todoId}>{todo.todo}</p></div>
                            )
                        })}
                    </div>
                <div className='uncompleted-div'>
                {todos.map(todo =>{
                    if(todo.completed === 1){return null;}
                    return(
                        <div className='todo uncompleted'><p key={todo.todoId}>{todo.todo}</p></div>
                    )
                })}
                </div>
                </div>
        </div>
        </div>
        
    )
}

export default Main

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
                <div className='todos'>
                    <div className="completed-div">
                        <h1>Completed</h1>
                        {todos.map(todo =>{
                            if(todo.completed === 0){return null;}
                            return(
                                <div className='todo completed'><p key={todo.todoId}>{todo.todo}</p></div>
                            )
                        })}
                    </div>
                <div className='uncompleted-div'>
                    <h1>Uncompleted</h1>
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

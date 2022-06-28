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
                <h1 className='todos-title'>hello</h1>
                <div className='todos'>
                    <div className="completed-div">
                        <h3>Completed</h3>
                        {todos.map(todo =>{
                            if(todo.completed === 0){return null;}
                            return(
                                <p key={todo.todoId}>{todo.todo}</p>
                            )
                        })}
                    </div>
                <div className='uncompleted-div'>
                    <h3>Uncompleted</h3>
                {todos.map(todo =>{
                    if(todo.completed === 1){return null;}
                    return(
                        <p key={todo.todoId}>{todo.todo}</p>
                    )
                })}
                </div>
                </div>
        </div>
        </div>
        
    )
}

export default Main

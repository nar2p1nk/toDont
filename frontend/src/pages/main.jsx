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
    axios.get('http://localhost:8080/todo/' + decodedToken.id)
        .then((res)=>{
            console.log(res.data)
            setTodos(res.data)
            console.log(todos)
            return;
        })
    return;
},[])
    return (
        <div className="main">
            <div className="intro">
                <h1>hello</h1>
                {todos.map((todo)=>{
                    return(
                        <p key={todo.todoId}>{todo.todo}</p>
                    )
                })}
            </div>
        </div>
        
    )
}

export default Main

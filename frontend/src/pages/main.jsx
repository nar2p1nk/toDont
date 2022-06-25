import './style/main.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const token = sessionStorage.getItem('jwtToken');

const Main = () => {

    const [todos,setTodos] = useState([])
    let navigate = useNavigate();
useEffect(()=>{
    console.log('useEffectr')
    const decodedToken = jwtDecode(token)
    if(token === null){
        navigate('/login')
    }
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
                
            </div>
        </div>
        
    )
}

export default Main

import './style/main.css';
import axios from 'axios';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const token = sessionStorage.getItem('jwtToken');

const Main = () => {
    let navigate = useNavigate();
useEffect(()=>{
    if(token === null){
        navigate('/login')
    }
    axios.get('http://localhost:8080')
        .then((res)=>{
            console.log(res.data)
        })
})
    return (
        <div className="main">
            <div className="intro">
                <h1>hello</h1>
            </div>
        </div>
        
    )
}

export default Main

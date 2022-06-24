import './style/main.css';
import axios from 'axios';
import {useEffect} from 'react';
import {Navigate} from 'react-router-dom';

const token = sessionStorage.getItem('jwtToken');

const Main = () => {

useEffect(()=>{
    axios.get('http://localhost:8080')
        .then((res)=>{
            console.log(res.data)
        })
})
    return (
        <div className="main">
            {token && (<Navigate to='/login' replace/>)}
            <div className="intro">
                <h1>hello</h1>
            </div>
        </div>
        
    )
}

export default Main

import './style/main.css';
import axios from 'axios';
import {useEffect} from 'react';


const Main = () => {

useEffect(()=>{
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

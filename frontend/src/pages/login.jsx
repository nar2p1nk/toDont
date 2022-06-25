import {useState} from 'react';
import './style/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    let navigate = useNavigate();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const onChange = (e,useState,setUseState)=>{
        setUseState(e.target.value)
        console.log(useState)
    }

    const PostForm = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8080/login',{
            username:username,
            password:password
        })
            .then((res)=>{
                if(res.data.errMessage){
                    setErrorMessage(res.data.errMessage)
                    console.log(errorMessage)
                }
                if(res.data.token){
                    console.log(res.data.token)
                    sessionStorage.setItem('jwtToken', res.data.token)
                    navigate('/')
                }
            })
            .catch((err)=>{console.log(err)})

        console.log(username,password)

    }

    return (

        <div className="login">
            <form action="" method='POST' className='login-card'
                onSubmit={PostForm}>
                <h1>Login</h1>
                <p className='login-error'>{errorMessage}</p>
                <h2>
                    <label htmlFor="username">Username:</label><br />
                    <input
                        type="username"
                        name='username'
                        placeholder='Username'
                        className='login-input username'
                        onChange={e => onChange(e,username,setUsername)}
                        value={username}
                    />
                </h2>
                <h2>
                    <label htmlFor="password">Password:</label><br />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        className='login-input password'
                        onChange={e=>onChange(e,password,setPassword)}
                        value={password}
                    />
                </h2>
                <button
                    type='submit'
                    value='submit'
                    className='login-submit'
                >
                Submit</button>
            </form>
    </div>
    )
}

export default Login

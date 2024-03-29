import {useEffect, useState} from 'react';
import './style/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

// new pink EA11Ad

const Register = () => {

    const token = sessionStorage.getItem('jwtToken');

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
        axios.post('/signup',{
            username:username,
            password:password
        })
            .then((res)=>{
                if(res.data.errMessage){
                    setErrorMessage(res.data.errMessage)
                    console.log(errorMessage)
                }
                    navigate('/login')
            })
            .catch((err)=>{console.log(err)})

        console.log(username,password)

    }

    useEffect(()=>{
        if(token !== null){
            navigate('/')
        }
    })
    return (

        <div className="login">
            <div className="background-register top"></div>
            <form action="" method='POST' className='login-card'
                onSubmit={PostForm}>
                <h1 className='login-title'>Signup</h1>
                <p className='login-error'>{errorMessage}</p>

                <div>
                    <h2 className='label username'>
                        <label htmlFor="username" >Username:</label>
                    </h2>

                    <input
                        type="username"
                        name='username'
                        placeholder='Username'
                        className='login-input username'
                        onChange={e => onChange(e,username,setUsername)}
                        value={username}
                    />

                </div>
                <div>
                    <h2 className='label password'><label htmlFor="password">Password:</label></h2>
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        className='login-input password'
                        onChange={e=>onChange(e,password,setPassword)}
                        value={password}
                    />
                </div>
                <span className='signup'>
                    already have an account?
                <Link to='/login' className='signup link'> Login now!</Link>
                </span>
                <button
                    type='submit'
                    value='submit'
                    className='login-submit'
                >
                Log In</button>
            </form>
            <div className="background-register bottom"></div>
    </div>
    )
}

export default Register

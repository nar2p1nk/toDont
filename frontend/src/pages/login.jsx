import {useState} from 'react';
import './style/login.css';

const Login = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const onChange = (e,useState,setUseState)=>{
        setUseState(e.target.value)
        console.log(useState)
    }

    const postForm = (e) => {
        e.preventDefault()
        console.log(username,password)
    }

    return (

        <div className="login">
            <form action="" method='POST' className='login-card'
                onSubmit={postForm}>
                <h1>Login</h1>
                <p className='login-error'></p>
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

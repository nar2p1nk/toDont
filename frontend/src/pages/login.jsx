import './style/login.css';

const login = () => {
    return (
    <div class="login">
        <form action="" method='POST' class='login-card' onSubmit={(e)=>{e.preventDefault()}}>
                <h1>Login</h1>
                <h2>
                    <label for="username">Username:</label><br />
                    <input
                        type="username"
                        name='username'
                        placeholder='Username'
                        class='login-input username'
                    />
                </h2>
                <h2>
                    <label for="password">Password:</label><br />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        class='login-input password'
                    />
                </h2>
                <button
                    type='submit'
                    value='submit'
                    class='login-submit'
                >
                Submit</button>
            </form>
    </div>
    )
}

export default login

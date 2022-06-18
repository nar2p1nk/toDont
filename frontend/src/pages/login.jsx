import './style/login.css';

const login = () => {
    return (
    <div class="login">
        <form action="" method='POST' class='login-card' onSubmit={(e)=>{e.preventDefault()}}>
                <h1>Login</h1>
                <h2><label for="username">Username:</label><br />
                    <input type="username" name='username'/></h2>
                <h2><label for="password">Password:</label><br />
                    <input type="password" name='password' /></h2>
                <button type='submit' value='submit'>Submit</button>
            </form>
    </div>
    )
}

export default login

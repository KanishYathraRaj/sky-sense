import './Login.css';

export const Login = (prop) => {
    
    return (
        <div className="auth-form-container smooth-zoom">
            <h2>Login</h2>
            <form className="login-form">
                <label htmlFor="email">Email :</label>
                <input type="email" placeholder="Enter your email" id="email" name="email" />
                <label htmlFor="password">Password :</label>
                <input type="password" placeholder="enter your password" id="password" name="password" />
                <button className='submit-btn' type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => prop.onFormSwitch('register')}>Don  t have an account? Register here.</button>
        </div>
    )
}
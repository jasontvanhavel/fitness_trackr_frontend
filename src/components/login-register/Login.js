import axios from 'axios';
import React from 'react';
import './login.css'

const Login = ({isLoggedIn, setIsLoggedIn}) => {

    async function login() {

        const user = {
            username: document.getElementById("username-input").value,
            password: document.getElementById("password-input").value
        }
        try {
            let response = await axios.post('https://fitnesstrac-kr.herokuapp.com/api/users/login', user)
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('userToken', response.data.token);
            setIsLoggedIn(true);
        } catch (error) {
            console.error(error);
            document.getElementById("error-message").innerHTML = error.response.data.message;
        }
    }

    return <div id="login-page-div">
        <h1>Login</h1>
        {isLoggedIn ? 
            <div id="error-message">You are currently logged in as {localStorage.getItem("username")}</div>
            : 
            <div id="login-entry">
                <div id="username">
                    <label htmlFor="username-input">Username:</label>
                    <input type="text" id="username-input"></input>
                </div>
                <div id="password">
                    <label htmlFor="password-input">Password (must be at least 8 characters):</label>
                    <input type="password" id="password-input"></input>
                </div>
                <button onClick={async () => {await login()}}>Login</button>
                <div id="error-message"></div>            
            </div>
        }
    </div>
}

export default Login;
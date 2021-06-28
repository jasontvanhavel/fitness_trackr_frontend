import axios from 'axios';
import React from 'react';

import './register.css'

const Register = ({isLoggedIn, setIsLoggedIn}) => {

    async function register() {
        const inputUsername = document.getElementById("username-input").value;
        const inputPassword = document.getElementById("password-input").value;

        if (inputPassword.length >= 8){
            const user = {
                username: inputUsername,
                password: inputPassword
            }
            try {
                const response = await axios.post('https://fitnesstrac-kr.herokuapp.com/api/users/register', user);
                localStorage.setItem("userToken", response.data.token);
                localStorage.setItem("username", response.data.user.username);
                setIsLoggedIn(true)

            } catch (error) {
                console.error(error)
                document.getElementById("error-message").innerHTML = error.response.data.message;
            }
        } else {
            document.getElementById("error-message").innerHTML = "Password must be at least 8 characters long";
        }
    }

    return <div id="registration-div">
        <h1>Registration</h1>
        {isLoggedIn ? 
            <p >You're currently logged in as: {localStorage.getItem("username")}</p>
            : <div id="registration-entry">
                <div id="username">
                    <label htmlFor="username-input">Username:</label>
                    <input type="text" id="username-input"></input>
                </div>
                <div id="password">
                    <label htmlFor="password-input">Password (must be at least 8 characters):</label>
                    <input type="password" id="password-input"></input>
                </div>
                <button onClick={async () => {await register()}}>Register</button>
                <p id="error-message"></p>
            </div>
        }
    </div>
}

export default Register;
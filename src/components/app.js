import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home'
import Navbar from './Navbar';
import Activities from './activities/Activities';
import Routines from './routines/Routines';
import MyRoutines from './routines/MyRoutines';
import Login from './login-register/Login';
import Register from './login-register/Register';
import './app.css'

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("username") ? true : false)
    
    return <div id="app">
        <Router>
            <header>
                <div></div>
                <h1>Fitness Trackr</h1>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </header>
            <main>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/routines" render={() => <Routines />} />
                <Route exact path="/activities" render={() => <Activities isLoggedIn={isLoggedIn} />} />
                <Route exact path="/login" render={() => <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
                <Route exact path="/register" render={() => <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route exact path="/myroutines" render={() => <MyRoutines isLoggedIn={isLoggedIn}/>} />
            </main>
        </Router>
    </div>
}

export default App;
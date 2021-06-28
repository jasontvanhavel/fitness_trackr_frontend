import React from 'react';
import {Link} from 'react-router-dom';

import './navbar.css';

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {

    function logout() {
        localStorage.clear();
        setIsLoggedIn(false);
    }

    return <div id="navbar">
        <Link to="/">Home</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/routines">Routines</Link>
        {isLoggedIn ? 
            <>
                <Link to="/myroutines">My Routines</Link>
                <div onClick={() => {logout()}}>Log Out</div> 
            </>
            :
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
        }
    </div>
}

export default Navbar;
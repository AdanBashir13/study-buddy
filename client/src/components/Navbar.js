import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/schedule">Schedule</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/groups">Groups</Link>
            <Link to="/collaboration">Collaboration</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    );
};

export default NavBar;

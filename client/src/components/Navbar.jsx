// src/components/NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <div className="nav-links">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/about" className="nav-link">About</NavLink>
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
                <NavLink to="/schedule" className="nav-link">Schedule</NavLink>
                <NavLink to="/progress" className="nav-link">Progress</NavLink>
                <NavLink to="/groups" className="nav-link">Groups</NavLink>
                <NavLink to="/collaboration" className="nav-link">Collaboration</NavLink>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/register" className="nav-link">Register</NavLink>
            </div>
        </nav>
    );
};

export default NavBar;

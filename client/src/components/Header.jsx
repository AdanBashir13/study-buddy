import React from 'react';
import NavBar from './Navbar';
import StudyBuddyLogo from '../pages/images/logo.png';

const Header = () => {
    return (
        <header className="header">
            <img src={StudyBuddyLogo} alt="Study Buddy Logo" className="logo-image" />
            <NavBar />
        </header>
    );
};

export default Header;
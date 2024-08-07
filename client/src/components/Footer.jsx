import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Study Buddy helps students manage their study schedules effectively, ensuring they stay organized and motivated.</p>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: support@studybuddy.com</p>
                    <p>Phone: 0722000030</p>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                        <li><a href="https://www.twitter.com" target="_blank" >Twitter</a></li>
                        <li><a href="https://www.instagram.com" target="_blank" >Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Study Buddy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

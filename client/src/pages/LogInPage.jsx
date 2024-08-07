import React, { useState } from 'react';

const LoginPage = () => {
    // State variables for email, password, and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle login logic
    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store the token
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* Input fields for email and password */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* Login button */}
                <button onClick={handleLogin}>Login</button>
                
                {/* Link to sign up page */}
                <div className="signup-link">
                    <p>Don't have an account? <a href="/register">Sign up here</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

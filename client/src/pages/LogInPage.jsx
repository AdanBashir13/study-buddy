import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Logging in with', email, password);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>
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
                <button onClick={handleLogin}>Login</button>
                <div className="signup-link">
                    <p>Don't have an account? <a href="/signup">Sign up here</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

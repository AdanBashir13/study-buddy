import React, { useState } from 'react';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        console.log('Registering with', email, password, confirmPassword);
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h1>Register</h1>
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
                <div className="login-link">
                    <p>Already have an account? <a href="/login">Log in here</a></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

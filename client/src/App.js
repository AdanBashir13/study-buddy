// src/App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Header />
            <main>
                <h1>Welcome to Study Buddy</h1>
                <p>Your ultimate tool for managing study schedules and tracking progress.</p>
            </main>
            <Footer />
        </>
    );
}

export default App;

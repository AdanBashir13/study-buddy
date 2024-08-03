// src/pages/Home.js
import React from 'react';
import SussieImage from './images/sussie.jpg'
import KevinImage from './images/kevin.jpg'

const Home = () => {
    return (
        <div className="home-container">
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="home-title">Welcome to Study Buddy</h1>
                    <p className="home-description">
                        Your ultimate tool for managing study schedules and tracking progress.
                        Study Buddy helps you stay organized, collaborate with peers, and enhance your learning experience.
                    </p>
                    <button className="cta-button">Get Started</button>
                </div>
            </header>

            <section className="features-section">
                <h2>Key Features</h2>
                <div className="features">
                    <div className="feature">
                        <i className="fas fa-calendar-alt feature-icon"></i>
                        <h3>Schedule Study Sessions</h3>
                        <p>Plan your study sessions efficiently and never miss an important study time. With Study Buddy, you can create and manage your study schedule effortlessly, ensuring that you stay on top of your academic goals.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-chart-line feature-icon"></i>
                        <h3>Track Your Progress</h3>
                        <p>Monitor your progress with detailed analytics and achieve your study goals. Study Buddy provides insights into your study habits, helping you to improve and succeed.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-users feature-icon"></i>
                        <h3>Collaborate with Friends</h3>
                        <p>Work together with your friends and keep each other motivated. Share your schedules, track group study sessions, and stay connected with your study community.</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <i className="fas fa-user-plus step-icon"></i>
                        <h3>1. Sign Up</h3>
                        <p>Create an account to get started with Study Buddy. It's quick and easy!</p>
                    </div>
                    <div className="step">
                        <i className="fas fa-calendar-plus step-icon"></i>
                        <h3>2. Create a Schedule</h3>
                        <p>Set up your study schedule and plan your sessions. Customize your timetable to fit your personal needs.</p>
                    </div>
                    <div className="step">
                        <i className="fas fa-tasks step-icon"></i>
                        <h3>3. Track Your Progress</h3>
                        <p>Use our tools to track your study sessions and see your improvements. Analyze your data to enhance your productivity.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial">
                    <img src= {SussieImage} alt="sussie smith" className="testimonial-image" />
                    <p>"Study Bddy has completely transformed the way I study. I am more organized and productive than ever!"</p>
                    <p>- Sussie Smith </p>
                </div>
                <div className="testimonial">
                    <img src= {KevinImage} alt="kevin conner" className="testimonial-image" />
                    <p>"The collaboration feature is amazing. I love being able to study with my friends and keep each other motivated."</p>
                    <p>- Kevin Conner</p>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Get Started?</h2>
                <p>Join Study Buddy today and take your study habits to the next level.</p>
                <button className="cta-button">Sign Up Now</button>
            </section>
        </div>
    );
};

export default Home;

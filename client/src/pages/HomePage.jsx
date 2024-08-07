import React from 'react';
import SussieImage from './images/sussie.jpg';
import KevinImage from './images/kevin.jpg';

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero section with welcome message */}
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="home-title">Welcome to Study Buddy</h1>
                    <p className="home-description">
                        Your ultimate tool for managing study schedules and tracking progress.
                        Study Buddy helps you stay organized, collaborate with peers, and enhance your learning experience.
                    </p>
                    <a href="/register" className="cta-button">Get Started</a>
                </div>
            </header>

            {/* Features section showcasing key features */}
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

            {/* Section explaining how the application works */}
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

            {/* Benefits section highlighting advantages of using the app */}
            <div className="additional-sections">
                <section className="benefits-section">
                    <h2>Benefits of Using Study Buddy</h2>
                    <div className="benefits">
                        <div className="benefit">
                            <h3>Stay Organized</h3>
                            <p>Keep all your study materials and schedules in one place, making it easier to focus on your studies.</p>
                        </div>
                        <div className="benefit">
                            <h3>Improve Collaboration</h3>
                            <p>Engage with your peers in a collaborative learning environment that encourages group studies.</p>
                        </div>
                    </div>
                </section>

                {/* Section encouraging user involvement */}
                <section className="involved-section">
                    <h2>Get Involved</h2>
                    <div className="involved">
                        <div className="involvement">
                            <h3>Join Our Community</h3>
                            <p>Connect with other learners, share resources, and participate in study groups for a richer learning experience.</p>
                        </div>
                        <div className="involvement">
                            <h3>Provide Feedback</h3>
                            <p>Your insights are valuable! Help us improve Study Buddy by sharing your experiences and suggestions.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Testimonials section with user feedback */}
            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial">
                    <img src={SussieImage} alt="Sussie Smith" className="testimonial-image" />
                    <p>"Study Buddy has completely transformed the way I study. I am more organized and productive than ever!"</p>
                    <p>- Sussie Smith</p>
                </div>
                <div className="testimonial">
                    <img src={KevinImage} alt="Kevin Conner" className="testimonial-image" />
                    <p>"The collaboration feature is amazing. I love being able to study with my friends and keep each other motivated."</p>
                    <p>- Kevin Conner</p>
                </div>
            </section>

            {/* Call-to-action section encouraging users to sign up */}
            <section className="cta-section">
                <h2>Ready to Get Started?</h2>
                <p>Join Study Buddy today and take your study habits to the next level.</p>
                <a href="/register" className="cta-button">Sign Up Now</a>
            </section>
        </div>
    );
};

export default Home;

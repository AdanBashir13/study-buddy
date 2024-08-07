import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSession } from '../store/progressSlice';
import { isAuthenticated } from '../auth';

const SchedulePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Check if the user is authenticated, redirect to login if not
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    // Function to handle adding a new study session
    const handleAddSession = async () => {
        try {
            const response = await fetch('/api/study-schedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, date, time })
            });

            if (response.ok) {
                const data = await response.json();
                // Dispatch the action to add the session to the Redux store
                dispatch(addSession(data.session));
                setSuccessMessage('Study session added successfully!');
                setTitle('');
                setDate('');
                setTime('');
                setTimeout(() => {
                    navigate('/progress');
                }, 2000); // Redirect to progress page after 2 seconds
            } else {
                console.error('Failed to add session');
            }
        } catch (error) {
            console.error('Error during adding session:', error);
        }
    };

    return (
        <div className="schedule-page">
            <header className="schedule-header">
                <h1>Study Schedule</h1>
                <p>Plan your study sessions and stay organized with your study schedule.</p>
            </header>

            <div className="info-container">
                <section className="guidelines">
                    <h2>Why Schedule Your Study Sessions?</h2>
                    <p>
                        Scheduling your study sessions helps you manage your time effectively, ensuring you cover all necessary material before exams. Here are some benefits:
                    </p>
                    <ul>
                        <li>Improved time management</li>
                        <li>Reduced stress</li>
                        <li>Better retention of information</li>
                        <li>Structured study environment</li>
                    </ul>
                </section>

                <section className="tips">
                    <h2>Study Tips</h2>
                    <p>
                        To make the most out of your study sessions, consider the following tips:
                    </p>
                    <ul>
                        <li>Set specific goals for each session.</li>
                        <li>Use active learning techniques, such as summarizing or teaching others.</li>
                        <li>Take regular breaks to stay focused.</li>
                        <li>Review your notes before starting a new topic.</li>
                    </ul>
                </section>
            </div>

            <section className="form-container">
                <h2>Add New Study Session</h2>
                <input
                    type="text"
                    placeholder="Session Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button onClick={handleAddSession}>Add Session</button>
                {successMessage && <p>{successMessage}</p>}
            </section>
        </div>
    );
};

export default SchedulePage;

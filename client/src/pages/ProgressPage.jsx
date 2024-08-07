import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth'; // Import isAuthenticated

const ProgressPage = () => {
    const navigate = useNavigate();
    // State variables for uncompleted and completed sessions
    const [uncompletedSessions, setUncompletedSessions] = useState([]);
    const [completedSessions, setCompletedSessions] = useState([]);

    // Effect to check authentication and fetch sessions
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        } else {
            fetchSessions(); 
        }
    }, [navigate]);

    // Function to fetch study sessions from the API
    const fetchSessions = async () => {
        try {
            const response = await fetch('/api/progress', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            const uncompleted = data.progress.filter(session => session.status === 'uncompleted');
            const completed = data.progress.filter(session => session.status === 'completed');
            setUncompletedSessions(uncompleted);
            setCompletedSessions(completed);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    // Function to mark a session as completed
    const handleCompleteSession = async (sessionId) => {
        try {
            await fetch(`/api/progress/${sessionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status: 'completed' })
            });
            fetchSessions(); // Refresh the session lists
        } catch (error) {
            console.error('Error marking session as completed:', error);
        }
    };

    return (
        <div className="progress-page">
            <header className="progress-header">
                <h1>Study Progress</h1>
                <p>Track your study sessions and progress over time.</p>
            </header>

            <section className="uncompleted-sessions">
                <h2>Uncompleted Sessions</h2>
                <ul>
                    {uncompletedSessions.map(session => (
                        <li key={session.id}>
                            <h3>{session.title}</h3>
                            <p>Date: {session.date}</p>
                            <p>Time: {session.time}</p>
                            <button onClick={() => handleCompleteSession(session.id)}>Done</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="completed-sessions">
                <h2>Completed Sessions</h2>
                <ul>
                    {completedSessions.map(session => (
                        <li key={session.id}>
                            <h3>{session.title}</h3>
                            <p>Date: {session.date}</p>
                            <p>Time: {session.time}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <blockquote className="motivation-quote">
                "Success is the sum of small efforts, repeated day in and day out."
            </blockquote>
        </div>
    );
};

export default ProgressPage;

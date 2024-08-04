import React from 'react';

const ProgressPage = () => {
    const sessions = [
        { title: 'Math Study', date: '2024-08-05', time: '14:00', completed: true, notes: 'Reviewed algebra and geometry.' },
        { title: 'Science Review', date: '2024-08-06', time: '16:00', completed: false, notes: '' },
        { title: 'History Project', date: '2024-08-07', time: '10:00', completed: true, notes: 'Worked on the World War II section.' },
        { title: 'Literature Reading', date: '2024-08-08', time: '15:00', completed: false, notes: '' },
    ];

    return (
        <div className="progress-page">
            <header className="progress-header">
                <h1>Your Study Progress</h1>
                <p>Track your study sessions and stay motivated to achieve your goals.</p>
            </header>

            <section className="completed-sessions">
                <h2>Completed Sessions</h2>
                {sessions.filter(session => session.completed).length === 0 ? (
                    <p>No sessions completed yet.</p>
                ) : (
                    <ul>
                        {sessions.filter(session => session.completed).map((session, index) => (
                            <li key={index}>
                                <h3>{session.title}</h3>
                                <p>Date: {session.date}</p>
                                <p>Time: {session.time}</p>
                                <p>Notes: {session.notes}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <hr></hr>
            <section className="upcoming-sessions">
                <h2>Upcoming Sessions</h2>
                <ul>
                    {sessions.filter(session => !session.completed).map((session, index) => (
                        <li key={index}>
                            <h3>{session.title}</h3>
                            <p>Date: {session.date}</p>
                            <p>Time: {session.time}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="motivation">
                <h2>Stay Motivated!</h2>
                <p>Remember, consistency is key to success. Keep pushing forward, and you'll reach your goals!</p>
                <blockquote>
                    "Success is the sum of small efforts, repeated day in and day out." – Robert Collier
                </blockquote>
            </section>
        </div>
    );
};

export default ProgressPage;

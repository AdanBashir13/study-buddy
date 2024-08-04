import React, { useState } from 'react';

const SchedulePage = () => {
    const [sessions, setSessions] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleAddSession = () => {
        setSessions([...sessions, { title, date, time }]);
        setTitle('');
        setDate('');
        setTime('');
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
            </section>

            <section className="sessions-list">
                <h2>Upcoming Study Sessions</h2>
                {sessions.length === 0 ? (
                    <p>No study sessions scheduled yet.</p>
                ) : (
                    <ul>
                        {sessions.map((session, index) => (
                            <li key={index}>
                                <h3>{session.title}</h3>
                                <p>Date: {session.date}</p>
                                <p>Time: {session.time}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default SchedulePage;

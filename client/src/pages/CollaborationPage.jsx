import React, { useState } from 'react';

const CollaborationPage = () => {
    const [collaborations, setCollaborations] = useState([]);
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');

    const handleStartCollaboration = () => {
        if (topic && description) {
            setCollaborations([...collaborations, { topic, description }]);
            setTopic('');
            setDescription('');
        }
    };

    return (
        <div className="collaboration-page">
            <header className="collaboration-header">
                <h1>Collaborate with Peers</h1>
                <p>Enhance your learning experience by collaborating on study topics.</p>
            </header>

            <section className="benefits">
                <h2>Benefits of Collaboration</h2>
                <div className="benefit-section">
                    <h3>Diverse Perspectives</h3>
                    <p>Gain insights from different viewpoints to deepen understanding of complex topics.</p>
                </div>
                <div className="benefit-section">
                    <h3>Increased Motivation</h3>
                    <p>Stay motivated and accountable through collaborative study efforts.</p>
                </div>
                <div className="benefit-section">
                    <h3>Shared Resources</h3>
                    <p>Access and share a wide range of study materials and resources.</p>
                </div>
                <div className="benefit-section">
                    <h3>Effective Learning</h3>
                    <p>Engage in discussions that enhance retention and understanding of the material.</p>
                </div>
            </section>

            <div className="form-container">
                <h2>Start a New Collaboration</h2>
                <input
                    type="text"
                    placeholder="Collaboration Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={handleStartCollaboration}>Start Collaboration</button>
            </div>

            <div className="collaborations-list">
                <h2>Ongoing Collaborations</h2>
                {collaborations.length === 0 ? (
                    <p>No collaborations available. Start one to get started!</p>
                ) : (
                    <ul>
                        {collaborations.map((collaboration, index) => (
                            <li key={index}>
                                <h3>{collaboration.topic}</h3>
                                <p>{collaboration.description}</p>
                                <button className="join-button">Join Collaboration</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CollaborationPage;

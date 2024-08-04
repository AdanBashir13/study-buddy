import React, { useState } from 'react';

const GroupPage = () => {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    const handleCreateGroup = () => {
        if (groupName && groupDescription) {
            setGroups([...groups, { name: groupName, description: groupDescription }]);
            setGroupName('');
            setGroupDescription('');
        }
    };

    return (
        <div className="group-page">
            <header className="group-header">
                <h1>Study Groups</h1>
                <p>Join or create study groups to enhance your learning experience.</p>
            </header>

            <section className="why-join">
                <h2>Why Join a Study Group?</h2>
                <div className="importance-section">
                    <h3>Collaboration</h3>
                    <p>Working together helps deepen understanding and tackle challenging topics more effectively.</p>
                </div>
                <div className="importance-section">
                    <h3>Guidance</h3>
                    <p>Learn from peers and share knowledge, creating a supportive learning environment.</p>
                </div>
                <div className="importance-section">
                    <h3>Resource Sharing</h3>
                    <p>Access a variety of study materials and resources that group members bring to the table.</p>
                </div>
                <div className="importance-section">
                    <h3>Communication</h3>
                    <p>Discuss ideas openly, clarify doubts, and engage in enriching conversations.</p>
                </div>
            </section>

            <div className="form-container">
                <h2>Create New Study Group</h2>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <textarea
                    placeholder="Group Description"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                />
                <button onClick={handleCreateGroup}>Create Group</button>
            </div>

            <div className="groups-list">
                <h2>Existing Study Groups</h2>
                {groups.length === 0 ? (
                    <p>No study groups available. Create one to get started!</p>
                ) : (
                    <ul>
                        {groups.map((group, index) => (
                            <li key={index}>
                                <h3>{group.name}</h3>
                                <p>{group.description}</p>
                                <button className="join-button">Join Group</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GroupPage;

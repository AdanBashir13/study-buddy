import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAuthenticated } from '../auth';

const GroupPage = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    // Effect to check authentication status
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    // Function to fetch all study groups
    const fetchGroups = async () => {
        try {
            const response = await fetch('/api/study-groups', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            setGroups(data.study_groups || []);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    // Function to handle joining a group
    const handleJoinGroup = async (groupId) => {
        const response = await fetch(`/api/study-groups/${groupId}/join`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.ok) {
            setMessage('Successfully joined the group!');
            fetchGroups();
        } else {
            console.error('Failed to join group');
            const errorData = await response.json();
            console.error(errorData.message);
            setMessage(errorData.message);
        }
    };

    // Function to handle creating a new group
    const handleCreateGroup = async () => {
        const response = await fetch('/api/study-groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: groupName,
                description: groupDescription,
            }),
        });

        if (response.ok) {
            fetchGroups(); // Refresh groups after creation
            setGroupName('');
            setGroupDescription('');
            setMessage('Study group created successfully!');
        } else {
            console.error('Failed to create group');
            const errorData = await response.json();
            console.error(errorData.message);
            setMessage(errorData.message);
        }
    };

    // Render the Group Page component
    return (
        <div className="group-page">
            <header className="group-header">
                <h1>Study Groups</h1>
                <p>Join or create study groups to collaborate and enhance your learning experience.</p>
            </header>

            <h2>Create a New Group</h2>
            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
            />
            <input
                type="text"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Group Description"
            />
            <button onClick={handleCreateGroup}>Create Group</button>
            <h3 className="message">{message}</h3>

            <h2>Available Groups</h2>
            <ul>
                {groups.map((group) => (
                    <li key={group.id}>
                        {group.name} - {group.description}
                        <button onClick={() => handleJoinGroup(group.id)}>Join</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupPage;

// progressSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for managing study progress
const progressSlice = createSlice({
    name: 'progress',
    initialState: {
        sessions: [],
        completedSessions: [],
    },
    reducers: {
        // Action to set uncompleted sessions
        setProgress: (state, action) => {
            state.sessions = action.payload;
        },
        // Action to add a new completed session
        addSession: (state, action) => {
            state.completedSessions.push(action.payload);
        },
        // Action to remove a session from uncompleted sessions
        removeSession: (state, action) => {
            state.sessions = state.sessions.filter(session => session.study_schedule_id !== action.payload);
        },
        // Action to clear all sessions
        clearSessions: (state) => {
            state.sessions = [];
            state.completedSessions = [];
        },
    },
});

export const { setProgress, addSession, removeSession, clearSessions } = progressSlice.actions;

export default progressSlice.reducer;

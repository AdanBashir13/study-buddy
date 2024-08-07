// groupSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for group management
const groupSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
    },
    reducers: {
        // Action to set groups
        setGroups: (state, action) => {
            state.groups = action.payload; // Update the groups in the state
        },
        // Action to add a new group
        addGroup: (state, action) => {
            state.groups.push(action.payload); // Add the new group to the array
        },
        // Action to clear all groups
        clearGroups: (state) => {
            state.groups = []; // Reset groups to an empty array
        },
        // Action to handle joining a group (optional implementation)
        joinGroup: (state, action) => {

        },
    },
});

export const { setGroups, addGroup, clearGroups, joinGroup } = groupSlice.actions;

export default groupSlice.reducer;

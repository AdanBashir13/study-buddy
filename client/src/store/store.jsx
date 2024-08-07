import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './progressSlice';
import groupReducer from './groupSlice';
// Create the store
const store = configureStore({
    reducer: {
        // Add the progress slice to the store
        progress: progressReducer,
        // Add the group slice to the store
        groups: groupReducer,
    },
});

export default store;

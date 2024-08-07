import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import ProgressPage from './pages/ProgressPage';
import GroupPage from './pages/GroupPage';
import LoginPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
    </Routes>
);

export default AppRouter;

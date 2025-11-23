import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useDispatch } from 'react-redux';

import AdminLayout from './pages/admin/Layout';
import DashboardPage from './pages/admin/DashboardPage';
import StationPage from './pages/admin/StationPage';
import AlertPage from './pages/admin/AlertPage';
import LogPage from './pages/admin/LogPage';
import UsersPage from './pages/admin/UsersPage';
import ProfilePage from './pages/admin/ProfilePage';
import SettingsPage from './pages/admin/SettingsPage';
import LoginPage from './pages/admin/LoginPage';
import SignInPage from './pages/admin/SignInPage';
import LandingPage from './pages/LandingPage';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('authToken');
    return isAuthenticated ? <AdminLayout /> : <Navigate to="/signin" />;
};

const AuthRedirect = () => {
    const isSetupComplete = localStorage.getItem('hasAdminBeenCreated');
    const destination = isSetupComplete ? '/signin' : '/login';
    return <Navigate to={destination} />;
};

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'WS_CONNECT' });
        return () => dispatch({ type: 'WS_DISCONNECT' });
    }, [dispatch]);

    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth' element={<AuthRedirect />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/educativo' element={<div className="text-white p-10 bg-slate-900 min-h-screen">Página Educativa em Construção...</div>} />

            <Route path='/admin' element={<ProtectedRoute />}>
                <Route index element={<DashboardPage />} />
                <Route path='dashboard' element={<DashboardPage />} />
                <Route path='stations' element={<StationPage />} />
                <Route path='alerts' element={<AlertPage />} />
                <Route path='logs' element={<LogPage />} />
                <Route path='users' element={<UsersPage />} />
                <Route path='profile' element={<ProfilePage />} />
                <Route path='settings' element={<SettingsPage />} />
            </Route>

            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
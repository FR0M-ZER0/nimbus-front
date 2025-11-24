import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from './pages/admin/Layout';
import DashboardPage from './pages/admin/DashboardPage';
import StationPage from './pages/admin/StationPage';
import AlertPage from './pages/admin/AlertPage';
import LogPage from './pages/admin/LogPage';
import UsersPage from './pages/admin/UsersPage';
import ProfilePage from './pages/admin/ProfilePage';
import SettingsPage from './pages/admin/SettingsPage';
import ReportsPage from './pages/admin/ReportsPage';
import LoginPage from './pages/admin/LoginPage';
import SignInPage from './pages/admin/SignInPage';
import { loginSuccess } from './store/slices/authSlice';
import api from './api/api';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('authToken');
    return isAuthenticated ? <AdminLayout /> : <Navigate to="/signin" />;
};

const InitialRedirect = () => {
    const isSetupComplete = localStorage.getItem('hasAdminBeenCreated');

    const destination = isSetupComplete ? '/signin' : '/login';
    
    return <Navigate to={destination} />;
};

function App() {
    const theme = useSelector(state => state.theme.mode)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'WS_CONNECT' })
        return () => dispatch({ type: 'WS_DISCONNECT' })
    }, [dispatch])

    useEffect(() => {
        const token = localStorage.getItem('authToken')

        if (token) {
            api.get('/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                dispatch(loginSuccess({
                    user: res.data,
                    token
                }))
            })
            .catch(() => {
                localStorage.removeItem('authToken')
            })
        }
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <Routes>
            <Route path='/' element={<InitialRedirect />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signin' element={<SignInPage />} />

            {/* Rotas Protegidas do Admin */}
            <Route path='/admin' element={<ProtectedRoute />}>
                <Route index element={<DashboardPage />} />
                <Route path='stations' element={<StationPage />} />
                <Route path='alerts' element={<AlertPage />} />
                <Route path='logs' element={<LogPage />} />
                <Route path='users' element={<UsersPage />} />
                <Route path='profile' element={<ProfilePage />} />
                <Route path='settings' element={<SettingsPage />} />
                <Route path='reports' element={<ReportsPage />} />
            </Route>

            {/* Redirecionamento para qualquer rota não encontrada */}
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;


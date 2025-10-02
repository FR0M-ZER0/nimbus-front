import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

// Páginas
import AdminLayout from './pages/admin/Layout';
import DashboardPage from './pages/admin/DashboardPage';
import StationPage from './pages/admin/StationPage';
import AlertPage from './pages/admin/AlertPage';
import LogPage from './pages/admin/LogPage';
import UsersPage from './pages/admin/UsersPage';
import ProfilePage from './pages/admin/ProfilePage';
import SettingsPage from './pages/admin/SettingsPage';
import LoginPage from './pages/admin/LoginPage';   // Sua página de Cadastro
import SignInPage from './pages/admin/SignInPage'; // Sua página de Login

// --- COMPONENTES DE LÓGICA DE ROTA ---

// Componente para proteger rotas. Se não estiver logado, manda para o login.
const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('authToken');
    return isAuthenticated ? <AdminLayout /> : <Navigate to="/signin" />;
};

// NOVO COMPONENTE: Decide a página inicial
const InitialRedirect = () => {
    // Verifica se a flag do primeiro acesso já existe
    const isSetupComplete = localStorage.getItem('hasAdminBeenCreated');

    // Se a flag existe, o destino é a página de login.
    // Se não existe, é o primeiro acesso, então o destino é a página de cadastro.
    const destination = isSetupComplete ? '/signin' : '/login';
    
    return <Navigate to={destination} />;
};

function App() {
    return (
        <Routes>
            {/* ROTA PRINCIPAL: Agora aponta para nosso componente inteligente */}
            <Route path='/' element={<InitialRedirect />} />
            
            {/* Suas rotas públicas de cadastro e login */}
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
            </Route>

            {/* Redirecionamento para qualquer rota não encontrada */}
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
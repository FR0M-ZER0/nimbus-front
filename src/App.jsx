import { React } from 'react'
import { Routes, Route, } from 'react-router'

// Páginas
import AdminLayout from './pages/admin/Layout'
import DashboardPage from './pages/admin/DashboardPage'
import StationPage from './pages/admin/StationPage'
import AlertPage from './pages/admin/AlertPage'
import LogPage from './pages/admin/LogPage'
import UsersPage from './pages/admin/UsersPage'
import ProfilePage from './pages/admin/ProfilePage'
import SettingsPage from './pages/admin/SettingsPage'
import LoginPage from './pages/admin/LoginPage'


function App() {
	return (
		<Routes>
			{/* Rotas do admin */}
			<Route path='/admin' element={<AdminLayout />} >
				<Route index element={<DashboardPage />} />
				<Route path='stations' element={<StationPage />} />
				<Route path='alerts' element={<AlertPage />} />
				<Route path='logs' element={<LogPage />} />
				<Route path='users' element={<UsersPage />} />
				<Route path='profile' element={<ProfilePage />} />
				<Route path='settings' element={<SettingsPage />} />
			</Route>
			<Route path='/admin/login' element={<LoginPage />} />
		</Routes>
	)
}

export default App

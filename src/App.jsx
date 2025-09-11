import { React } from 'react'
import { Routes, Route, } from 'react-router'

// Páginas
import AdminLayout from './pages/admin/Layout'
import DashboardPage from './pages/admin/DashboardPage'

function App() {
	return (
		<Routes>
			{/* Rotas do admin */}
			<Route path='/admin' element={<AdminLayout />} >
				<Route index element={<DashboardPage/>} />
			</Route>
		</Routes>
	)
}

export default App

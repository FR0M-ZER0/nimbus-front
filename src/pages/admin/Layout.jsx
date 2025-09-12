import React from 'react'
import { Outlet, useLocation } from 'react-router'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

function Layout() {
    const location = useLocation()

    const pageTitles = {
        '/admin': 'Dashboard',
        '/admin/stations': 'Estações',
        '/admin/alerts': 'Alertas',
        '/admin/logs': 'Histórico',
        '/admin/users': 'Usuários',
        '/admin/profile': 'Perfil',
        '/admin/settings': 'Configurações',
    }

    const title = pageTitles[location.pathname] || 'Admin'

    return (
        <div className='flex min-h-screen max-w-screen gradient-dark-bg main-light-color-text'>
            <Sidebar />
            <div className='flex-1 px-[20px]'>
                <Topbar title={title} />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout

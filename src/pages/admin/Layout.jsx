import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../components/Sidebar'

function Layout() {
    return (
        <div className='flex flex-col min-h-screen max-w-screen gradient-dark-bg main-light-color-text'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Layout

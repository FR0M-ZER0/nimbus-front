import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

function Layout() {
    return (
        <div className='flex min-h-screen max-w-screen gradient-dark-bg main-light-color-text'>
            <Sidebar />
            <div className='flex-1 px-[20px]'>
                <Topbar title={'Teste'} />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout

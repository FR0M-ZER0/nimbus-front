import React from 'react'
import { Outlet } from 'react-router'

function Layout() {
    return (
        <div className='min-h-screen min-w-screen gradient-dark-bg'>
            <Outlet />
        </div>
    )
}

export default Layout

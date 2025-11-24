import { Outlet, useLocation } from 'react-router'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import { ToastContainer, Zoom } from 'react-toastify'


function Layout() {
    const location = useLocation()

    const pageTitles = {
        '/admin': 'Dashboard',
        '/admin/stations': 'Estações',
        '/admin/alerts': 'Alertas',
        '/admin/logs': 'Histórico',
        '/admin/users': 'Usuários',
        '/admin/reports': 'Relatórios',
        '/admin/profile': 'Perfil',
        '/admin/settings': 'Configurações',
    }

    const title = pageTitles[location.pathname] || 'Admin'

    return (
        <div className='flex min-h-screen max-w-screen gradient-dark-bg main-light-color-text'>
            <Sidebar />
            <div className='flex-1 px-[20px] zoom-08'>
                <Topbar title={title} />
                <div className='flex flex-col items-center mt-[40px]'>
                    <Outlet />
                </div>
            </div>

			{/* Toast */}
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Zoom}
			/>
        </div>
    )
}

export default Layout

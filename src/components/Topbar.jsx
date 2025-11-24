import SystemSearchbar from './SystemSearchbar'
import { UserIcon, BellIcon, GearIcon } from '@phosphor-icons/react'
import HamburguerMenu from './HamburguerMenu'
import { useNavigate } from 'react-router'

function Topbar({ title }) {
    const navigate = useNavigate()
    return (
        <header className='flex py-[30px] items-center'>
            <p className='md:mr-0 mr-2 md:inline hidden'>
                { title }
            </p>

            <div className='flex items-center flex-1 md:justify-end'>
                <div className='mr-2'>
                    <HamburguerMenu />
                </div>
                <div className='md:w-[300px] w-full md:mr-8 mr-2'>
                    <SystemSearchbar />
                </div>

                <div className='flex'>
                    {/* TODO: Adicionar o componente LINK a cada icone */}
                    <UserIcon size={24} className='alt-light-color-text sm:block hidden cursor-pointer' onClick={() => navigate('/admin/profile')} />
                    <BellIcon size={24} className='alt-light-color-text md:mx-8 mx-2 cursor-pointer' />
                    <GearIcon size={24} className='alt-light-color-text sm:block hidden cursor-pointer' onClick={() => navigate('/admin/settings')} />
                </div>
            </div>
        </header>
    )
}

export default Topbar

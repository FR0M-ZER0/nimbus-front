import { useEffect, useState } from 'react'
import SystemSearchbar from './SystemSearchbar'
import CommandPalette from './CommandPalette'
import { UserIcon, BellIcon, GearIcon } from '@phosphor-icons/react'
import HamburguerMenu from './HamburguerMenu'
import { useNavigate } from 'react-router'

function Topbar({ title }) {
    const navigate = useNavigate()

    const [showPallete, setShowPallete] = useState(false)

    useEffect(() => {
        const handler = (e) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
            const isCtrlK = e.key.toLowerCase() === 'k' && e.ctrlKey
            const isCmdK  = e.key.toLowerCase() === 'k' && e.metaKey

            if (isMac ? isCmdK : isCtrlK) {
                e.preventDefault()
                setShowPallete(true)
            }
        }

        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    return (
        <>
            <header className='flex py-[30px] items-center'>
                <p className='md:mr-0 mr-2 md:inline hidden'>
                    { title }
                </p>

                <div className='flex items-center flex-1 md:justify-end'>
                    <div className='mr-2'>
                        <HamburguerMenu />
                    </div>
                    <div className='md:w-[300px] w-full md:mr-8 mr-2'>
                        <SystemSearchbar onClick={() => setShowPallete(true)} />
                    </div>

                    <div className='flex'>
                        <UserIcon size={24} className='alt-light-color-text sm:block hidden cursor-pointer' onClick={() => navigate('/admin/profile')} />
                        <BellIcon size={24} className='alt-light-color-text md:mx-8 mx-2 cursor-pointer' />
                        <GearIcon size={24} className='alt-light-color-text sm:block hidden cursor-pointer' onClick={() => navigate('/admin/settings')} />
                    </div>
                </div>
            </header>

            <CommandPalette open={showPallete} onClose={() => setShowPallete(false)} />
        </>
    )
}

export default Topbar

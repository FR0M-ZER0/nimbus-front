import { ListIcon, XIcon } from '@phosphor-icons/react'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router'
import { useState } from 'react';

function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button onClick={() => setIsOpen(true)} className='md:hidden z-50'>
                <ListIcon size={24} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className='fixed top-0 left-0 w-full h-full dark-gradient text-white z-40 p-6'
                    >
                        <button onClick={() => setIsOpen(false)} className='absolute top-4 right-4'>
                            <XIcon size={24} />
                        </button>

                        <ul className='mt-16 space-y-6'>
                            <li><Link to='/admin' onClick={() => setIsOpen(false)}>Dashboard</Link></li>
                            <li><Link to='/admin/stations' onClick={() => setIsOpen(false)}>Estações</Link></li>
                            <li><Link to='/admin/alerts' onClick={() => setIsOpen(false)}>Alertas</Link></li>
                            <li><Link to='/admin/logs' onClick={() => setIsOpen(false)}>Histórico</Link></li>
                            <li><Link to='/admin/users' onClick={() => setIsOpen(false)}>Usuários</Link></li>
                            <li><Link to='/admin/profile' onClick={() => setIsOpen(false)}>Perfil</Link></li>
                            <li><Link to='/admin/settings' onClick={() => setIsOpen(false)}>Configurações</Link></li>
                            <li><button>Sair</button></li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default HamburgerMenu

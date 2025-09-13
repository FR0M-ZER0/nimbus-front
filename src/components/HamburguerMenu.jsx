import { React, useState } from 'react'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

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

                        <ul className='mt-16 space-y-6 text-xl'>
                            <li><a href='/admin'>Dashboard</a></li>
                            <li><a href='/admin/stations'>Estações</a></li>
                            <li><a href='/admin/alerts'>Alertas</a></li>
                            <li><a href='/admin/logs'>Histórico</a></li>
                            <li><a href='/admin/users'>Usuários</a></li>
                            <li><a href='/admin/profile'>Perfil</a></li>
                            <li><a href='/admin/settings'>Configurações</a></li>
                            <li><button>Sair</button></li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default HamburgerMenu

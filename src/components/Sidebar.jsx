import React from 'react'
import { Link } from 'react-router'
import { HouseIcon, CircuitryIcon, WarningIcon, NewspaperIcon, UsersIcon, UserIcon, GearIcon, SignOutIcon } from '@phosphor-icons/react'

function Sidebar() {
    return (
        <nav className='p-[20px] flex flex-col min-h-screen w-[300px] dark-gradient'>
            <div className='flex w-full justify-center'>
                <img src='/nimbus_logo.svg' alt="logo" width={140} />
            </div>

            <div className='flex flex-col mt-[50px]'>
                <Link to={''} className='flex items-center mb-2 p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out'>
                    <HouseIcon size={28} />
                    <span className='ml-4'>Dashboard</span>
                </Link>
                <Link to={''} className='flex items-center mb-2 p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out'>
                    <CircuitryIcon size={28} />
                    <span className='ml-4'>Estações</span>
                </Link>
                <Link to={''} className='flex items-center mb-2 p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out'>
                    <WarningIcon size={28} />
                    <span className='ml-4'>Alertas</span>
                </Link>
                <Link to={''} className='flex items-center mb-2 p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out'>
                    <NewspaperIcon size={28} />
                    <span className='ml-4'>Histórico</span>
                </Link>
                <Link to={''} className='flex items-center mb-2 p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out'>
                    <UsersIcon size={28} />
                    <span className='ml-4'>Usuários</span>
                </Link>

                <p className='px-2 mt-[44px] mb-4'>Conta</p>

                <Link to={''} className='flex items-center mb-2 p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out'>
                    <UserIcon size={28} />
                    <span className='ml-4'>Perfil</span>
                </Link>
                <Link to={''} className='flex items-center mb-2 p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out'>
                    <GearIcon size={28} />
                    <span className='ml-4'>Configurações</span>
                </Link>
                <Link to={''} className='flex items-center p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out'>
                    <SignOutIcon size={28} />
                    <span className='ml-4'>Sair</span>
                </Link>
            </div>
        </nav>
    )
}

export default Sidebar

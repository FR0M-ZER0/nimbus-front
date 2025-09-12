import React from 'react'
import SystemSearchbar from './SystemSearchbar'
import { UserIcon, BellIcon, GearIcon } from '@phosphor-icons/react'

function Topbar({ title }) {
    return (
        <header className='flex py-[30px] items-center'>
            <p>
                { title }
            </p>

            <div className='flex items-center flex-1 justify-end'>
                <div className='w-[300px] mr-8'>
                    <SystemSearchbar />
                </div>

                <div className='flex'>
                    {/* TODO: Adicionar o componente LINK a cada icone */}
                    <UserIcon size={24} className='alt-light-color-text' />
                    <BellIcon size={24} className='alt-light-color-text mx-8' />
                    <GearIcon size={24} className='alt-light-color-text' />
                </div>
            </div>
        </header>
    )
}

export default Topbar

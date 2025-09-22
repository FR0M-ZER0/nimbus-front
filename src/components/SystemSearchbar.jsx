import React from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

function SystemSearchbar({ inputValue, onChange }) {
    return (
        <div className='w-full relative alt-dark-color-2-bg rounded-xl px-4 py-3' >
            <input placeholder='Pesquisar no sistema' value={inputValue} onChange={onChange} className='w-[90%] outline-none' />
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                <MagnifyingGlassIcon size={18} />
            </div>
        </div>
    )
}

export default SystemSearchbar

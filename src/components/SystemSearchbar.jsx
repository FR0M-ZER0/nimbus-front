import { MagnifyingGlassIcon } from '@phosphor-icons/react'

function SystemSearchbar({ onClick }) {
    return (
        <div className='w-full relative alt-dark-color-2-bg rounded-xl px-4 py-3 cursor-pointer' >
            <input 
                placeholder='Pesquisar no sistema (ctrl + k)'
                className='w-[90%] outline-none cursor-pointer'
                readOnly
                onClick={onClick}
            />
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                <MagnifyingGlassIcon size={18} />
            </div>
        </div>
    )
}

export default SystemSearchbar

import React from 'react'
import { XIcon } from '@phosphor-icons/react'

function Modal({ onClose, children }) {
    return (
        <div className='min-w-screen min-h-screen bg-black/75 fixed z-100 top-0 left-0' onClick={onClose}>
            <div className='min-h-[700px] max-w-[1200px] fixed top-1/2 left-1/2 -translate-1/2 alt-dark-color-bg z-101 w-[1200px] p-12 pb-22 rounded-lg' onClick={e => e.stopPropagation()}>
                <XIcon size={28} className='absolute right-[24px] top-[24px] cursor-pointer' onClick={onClose} />

                { children }

                <div className='flex w-full justify-end mt-4'>
                    <button className='cancel-button'>
                        Cancelar 
                    </button>
                    <button className='submit-button'>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal

import React from 'react'
import { XIcon } from '@phosphor-icons/react'

function Modal({ onClose, children }) {
    return (
        <div className='min-w-screen min-h-screen bg-black/75 fixed z-100 top-0 left-0' onClick={onClose}>
            <div className='max-h-[700px] max-w-[1200px] fixed top-1/2 left-1/2 -translate-1/2 alt-dark-color-bg z-101 h-[700px] w-[1200px] p-12' onClick={e => e.stopPropagation()}>
                <XIcon size={28} className='absolute right-[24px] top-[24px] cursor-pointer' onClick={onClose} />

                { children }
            </div>
        </div>
    )
}

export default Modal

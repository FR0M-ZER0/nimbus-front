import React from 'react'
import { ListIcon } from '@phosphor-icons/react'

function HamburguerMenu() {
    return (
        <nav className='md:hidden block'>
            <ListIcon size={24} />
        </nav>
    )
}

export default HamburguerMenu
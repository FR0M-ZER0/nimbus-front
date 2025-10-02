import React from 'react'

function InfoCard({ children }) {
    return (
        <div className='rounded-lg p-8 dark-gradient h-full'>
            { children }
        </div>
    )
}

export default InfoCard

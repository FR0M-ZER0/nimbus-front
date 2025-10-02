import React from 'react'
import InfoCard from './InfoCard'

function Card({ title, children }) {
    return (
        <InfoCard>
            <div className='flex flex-col'>
                <p className='text-3xl mb-8'>
                    { title }
                </p>

                { children }
            </div>
        </InfoCard>
    )
}

export default Card

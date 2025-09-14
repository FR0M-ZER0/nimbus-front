import React from 'react'
import StationForm from '../../components/StationForm'
import StationDownMap from '../../components/StationDownMap'

function StationPage() {
    return (
        <div className='w-full'>
            <div className='flex'>
                <div className='max-w-[680px]'>
                    <StationForm />
                </div>

                <div className='flex-1'>
                    <StationDownMap />
                </div>
            </div>
        </div>
        
    )
}

export default StationPage

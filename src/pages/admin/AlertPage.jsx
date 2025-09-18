import React from 'react'
import Calendar from '../../components/Calendar'
import LastAlerts from '../../components/LastAlerts'

function AlertPage() {
    return (
        <div className='w-full'>
            <div className='flex space-x-6'>
                <div className='max-w-[1400px] w-full'>
                    <Calendar />
                </div>
                <div className='flex-1'>
                    <LastAlerts />
                </div>
            </div>
        </div>
    )
}

export default AlertPage

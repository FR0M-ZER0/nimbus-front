import React from 'react'
import Calendar from '../../components/Calendar'
import LastAlerts from '../../components/LastAlerts'
import AlertsTable from '../../components/AlertsTable'
import AlertForm from '../../components/AlertForm'

function AlertPage() {
    return (
        <div className='w-full space-y-8'>
            <div className='flex space-x-6'>
                <div className='max-w-[1400px] w-full'>
                    <Calendar />
                </div>
                <div className='flex-1'>
                    <LastAlerts />
                </div>
            </div>

            <div className='flex space-x-6'>
                <div className='max-w-[720px] w-full'>
                    <AlertForm />
                </div>

                <div>
                    
                </div>
            </div>

            <div className='mb-8'>
                <AlertsTable />
            </div>
        </div>
    )
}

export default AlertPage

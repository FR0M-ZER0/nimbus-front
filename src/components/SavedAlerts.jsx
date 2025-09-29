import React from 'react'
import InfoCard from './InfoCard'
import Filter from './Filter'
import { TrashIcon, PencilSimpleIcon } from '@phosphor-icons/react'

function SavedAlerts() {
    const alerts = [
        { alertName: "abc123", alertDetail: "Chuva", alertOperator: ">", alertValue: "0.5 L", alertParam: "param123", alertMessage: "Tá chovendo muito mais que normal, perigo de enchente" },
        { alertName: "xyz661", alertDetail: "Chuva", alertOperator: ">", alertValue: "0.5 L", alertParam: "param123", alertMessage: "Ventos rápidos perigo iminente de tufões" },
    ]
    return (
        <InfoCard>
            <div className='flex items-center space-x-2 mb-2'>
                <h2 className='text-3xl'>Alertas</h2>
                <Filter />
            </div>

            <div className='space-y-8 mt-12 text-lg'>
                {
                    alerts.map((alert, index) => (
                        <div className='flex justify-between'>
                            <div>
                                <p key={index} className='font-bold'>
                                    {`Estação ${alert.alertName}: ${alert.alertDetail} ${alert.alertOperator} ${alert.alertValue}`}
                                </p>
        
                                <p>
                                    {`${alert.alertParam} - `}
                                    <span className='italic'>"{alert.alertMessage}"</span>
                                </p>
                            </div>
                            
                            <div className='flex space-x-2 items-center'>
                                <PencilSimpleIcon size={32} className='blue-color-text cursor-pointer' />
                                <TrashIcon size={32} className='text-red-600 cursor-pointer' />
                            </div>
                        </div>
                    ))
                }
            </div>
        </InfoCard>
    )
}

export default SavedAlerts
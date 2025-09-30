import React from 'react'
import InfoCard from './InfoCard'
import Filter from './Filter'
import { TrashIcon, PencilSimpleIcon } from '@phosphor-icons/react'
import api from '../api/api'
import { toast } from 'react-toastify'

function SavedAlerts({ alerts, onDelete }) {
    if (!alerts || alerts.length === 0) {
        return (
            <InfoCard>
                <h2 className='text-3xl mb-4'>Alertas</h2>
                <p className='text-gray-500'>Nenhum alerta salvo.</p>
            </InfoCard>
        )
    }

     const handleDelete = async (alertId) => {
        const confirm = window.confirm("Deseja realmente deletar este alerta?")
        if (!confirm) return;

        try {
            await api.delete(`/alerts/${alertId}`)
            toast.success("Alerta deletado com sucesso!")
            if (onDelete) onDelete()
        } catch (error) {
            console.error("Erro ao deletar alerta:", error)
            toast.error("Erro ao deletar alerta")
        }
    }
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
                                <TrashIcon 
                                    size={32} 
                                    className='text-red-600 cursor-pointer'
                                    onClick={() => handleDelete(alert.alertId)}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </InfoCard>
    )
}

export default SavedAlerts
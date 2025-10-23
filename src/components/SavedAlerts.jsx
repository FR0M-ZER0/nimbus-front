import InfoCard from './InfoCard'
import Filter from './Filter'
import AlertModal from './AlertModal'
import { TrashIcon, PencilSimpleIcon } from '@phosphor-icons/react'
import api from '../api/api'
import { toast } from 'react-toastify'
import loadingAnimation from '../assets/loading.gif'

function SavedAlerts({ alerts, onDelete, onUpdate, onLoading }) {
    const [alertEditing, setAlertEditing] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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

    const handleEdit = (alert) => {
        setAlertEditing(alert)
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setAlertEditing(null)
        setIsEditModalOpen(false)
    }

    return (
        <InfoCard>
            <div className='flex items-center space-x-2 mb-2'>
                <h2 className='text-3xl'>Alertas</h2>
                <Filter />
            </div>

            {onLoading ? (
                <div className="flex justify-center my-8">
                    <img src={loadingAnimation} alt="Carregando..." width={120} />
                </div>
            ) : alerts.length === 0 ? (
                <p className='text-gray-500'>Nenhum alerta salvo.</p>
            ) : (
                <div className='space-y-8 mt-12 text-lg'>
                    {alerts.map((alert) => (
                        <div key={alert.id_alerta} className='flex justify-between'>
                            <div>
                                <p className='font-bold'>
                                    {`Estação ${alert.parametro.id_estacao}: ${alert.titulo} ${alert.tipo_alerta.operador} ${alert.tipo_alerta.valor}`}
                                </p>
                                <p>
                                    {`${alert.parametro.descricao} - `}
                                    <span className='italic'>"{alert.texto}"</span>
                                </p>
                            </div>
                            
                            <div className='flex space-x-2 items-center'>
                                <PencilSimpleIcon
                                    size={32}
                                    className='blue-color-text cursor-pointer'
                                    onClick={() => handleEdit(alert)}
                                />
                                <TrashIcon 
                                    size={32} 
                                    className='text-red-600 cursor-pointer'
                                    onClick={() => handleDelete(alert.id_alerta)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isEditModalOpen && (
                <AlertModal
                    alertEditing={alertEditing}
                    closeModal={closeEditModal}
                    onUpdate={onUpdate}
                />
            )}
        </InfoCard>
    )
}

export default SavedAlerts

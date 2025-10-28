import Modal from './Modal'
import api from '../api/api'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react';

function AlertModal({ closeModal, alertEditing, onUpdate }) {
    const [stations, setStations] = useState([])
    const [params, setParams] = useState([])
    const [users, setUsers] = useState([])

    const [stationId, setStationId] = useState(alertEditing?.id_estacao || '')
    const [title, setTitle] = useState(alertEditing?.titulo || '')
    const [message, setMessage] = useState(alertEditing?.texto || '')
    const [alertTypeId, setAlertTypeId] = useState(alertEditing?.id_tipo_alerta || '')
    const [paramId, setParamId] = useState(alertEditing?.id_tipo_parametro || '')
    const [selectedUsers, setSelectedUsers] = useState(alertEditing?.usuarios || [])
    const [operator, setOperator] = useState('')
    const [value, setValue] = useState('')

    const fetchStations = async () => {
        try {
            const res = await api.get('/stations')
            setStations(res.data.data || [])
        } catch (err) {
            console.error('Erro ao carregar estações:', err)
        }
    }

    const fetchParams = async () => {
        if (!stationId) return
        try {
            const res = await api.get(`/stations/${stationId}/tipo-parametros`)
            setParams(res.data || [])
        } catch (err) {
            console.error('Erro ao carregar parâmetros:', err)
        }
    }

    const fetchUsers = async () => {
        try {
            const res = await api.get('/user')
            setUsers(res.data.usuarios || [])
        } catch (err) {
            console.error('Erro ao carregar usuários:', err)
        }
    }

    const handleSubmit = async () => {
        try {
            const tipoAlertaPayload = {
                operador: operator,
                valor: parseFloat(value),
            }
            await api.put(`/alert-type/${alertTypeId}`, tipoAlertaPayload)

            const alertaPayload = {
                id_estacao: stationId,
                titulo: title,
                texto: message,
                id_tipo_alerta: parseInt(alertTypeId),
                id_tipo_parametro: parseInt(paramId),
                usuarios: selectedUsers,
            }
            await api.put(`/alerts/${alertEditing.id_alerta}`, alertaPayload)

            toast.success('Alerta atualizado com sucesso!')
            onUpdate()
            closeModal()
        } catch (err) {
            console.error('Erro ao atualizar alerta:', err)
            toast.error('Erro ao atualizar alerta')
        }
    }

    useEffect(() => {
        fetchStations()
        fetchUsers()
    }, [])

    useEffect(() => {
        fetchParams()
    }, [stationId])

    useEffect(() => {
        if (alertEditing) {
            setStationId(alertEditing.parametro?.estacao?.id_estacao || '')
            setTitle(alertEditing.titulo || '')
            setMessage(alertEditing.texto || '')
            setAlertTypeId(alertEditing.id_tipo_alerta || '')
            setParamId(alertEditing.parametro?.id_tipo_parametro || '')
            setSelectedUsers(alertEditing.alertaUsuarios?.map(u => u.usuario.id_usuario) || [])
            setOperator(alertEditing.tipo_alerta?.operador || '>')
            setValue(alertEditing.tipo_alerta?.valor || '')
        }
    }, [alertEditing])

    return (
        <Modal onClose={closeModal} needsButton={true} onSave={handleSubmit}>
            <h2 className='text-2xl alt-light-color-text mb-12'>Editar Alerta</h2>

            <div className='grid grid-cols-6 gap-x-8 gap-y-10'>
                <div className='col-span-6'>
                    <label className='mb-2'>Título</label>
                    <input
                        type="text"
                        className='form-input w-full'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='col-span-3'>
                    <label className='mb-2'>Condição</label>
                    <select
                        className='form-input w-full'
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                    >
                        <option value={">"}>Maior que</option>
                        <option value={"<"}>Menor que</option>
                        <option value={"="}>Igual</option>
                        <option value={">="}>Maior igual que</option>
                        <option value={"<="}>Menor igual que</option>
                    </select>
                </div>

                <div className='col-span-3'>
                    <label className='mb-2'>Valor</label>
                    <input
                        type="number"
                        className='form-input w-full'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <div className='col-span-3'>
                    <label className='mb-2'>Estação</label>
                    <select
                        className='form-input w-full'
                        value={stationId}
                        onChange={(e) => setStationId(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {stations.map(station => (
                            <option key={station.id_estacao} value={station.id_estacao}>
                                {station.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='col-span-3'>
                    <label className='mb-2'>Parâmetro</label>
                    <select
                        className='form-input w-full'
                        value={paramId}
                        onChange={(e) => setParamId(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {params.map(param => (
                            <option key={param.id_tipo_parametro} value={param.id_tipo_parametro}>
                                {param.nome} ({param.unidade})
                            </option>
                        ))}
                    </select>
                </div>

                <div className='col-span-6'>
                    <div className="rounded-lg p-2 space-y-1 max-h-48 overflow-y-auto main-dark-color-bg">
                        {users.map(user => (
                            <label
                                key={user.id_usuario}
                                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                                    selectedUsers.includes(user.id_usuario)
                                    ? 'bg-[#292988]'
                                    : ''
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selectedUsers.includes(user.id_usuario)}
                                    onChange={() => {
                                        if (selectedUsers.includes(user.id_usuario)) {
                                            setSelectedUsers(selectedUsers.filter(id => id !== user.id_usuario))
                                        } else {
                                            setSelectedUsers([...selectedUsers, user.id_usuario])
                                        }
                                    }}
                                />
                                {user.nome} ({user.email})
                            </label>
                        ))}
                    </div>
                </div>

                <div className='col-span-6'>
                    <label className='mb-2'>Mensagem</label>
                    <textarea
                        className='form-input w-full'
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default AlertModal

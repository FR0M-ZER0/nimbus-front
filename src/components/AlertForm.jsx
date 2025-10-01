import React, { useEffect, useState } from 'react'
import Card from './Card'
import api from '../api/api'
import { toast } from 'react-toastify'

function AlertForm({ onAdd }) {
    const [stations, setStations] = useState([])
    const [selectedStation, setSelectedStation] = useState('')
    const [parametros, setParametros] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [formData, setFormData] = useState({
        titulo: '',
        texto: '',
        operador: '>',
        valor: '',
        id_tipo_parametro: '',
    })

    const fetchStations = async () => {
        try {
            const response = await api.get('/stations')
            setStations(response.data.data)
        } catch (error) {
            console.error("Erro ao carregar estações:", error)
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await api.get('/user')
            setUsers(response.data.usuarios)
        } catch (error) {
            console.error("Erro ao carregar usuários:", error)
        }
    }

    const fetchParametros = async () => {
        if (!selectedStation) return;
        try {
            const response = await api.get(`/stations/${selectedStation}/tipo-parametros`)
            setParametros(response.data)
        } catch (error) {
            console.error("Erro ao carregar parâmetros:", error)
        }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const tipoAlertaPayload = {
                operador: formData.operador,
                valor: parseFloat(formData.valor),
            }
            const tipoAlertaResponse = await api.post('/alert-type', tipoAlertaPayload)
            const id_tipo_alerta = tipoAlertaResponse.data.id

            const alertaPayload = {
                id_estacao: selectedStation,
                titulo: formData.titulo,
                texto: formData.texto,
                id_tipo_alerta: id_tipo_alerta,
                id_tipo_parametro: parseInt(formData.id_tipo_parametro),
                usuarios: selectedUsers,
            }
            const alertaResponse = await api.post('/alerts', alertaPayload)

            console.log('Alerta criado com sucesso:', alertaResponse.data)
            toast.success('Alerta criado com sucesso!')

            setFormData({
                titulo: '',
                texto: '',
                operador: '>',
                valor: '',
                id_tipo_parametro: '',
            })
            setSelectedStation('')
            setSelectedUsers([])
            onAdd()
        } catch (error) {
            console.error('Erro ao criar alerta:', error)
            toast.error('Erro ao criar alerta')
        }
    }

    useEffect(() => {
        fetchStations()
        fetchUsers()
    }, [])

    useEffect(() => {
        fetchParametros()
    }, [selectedStation])

return (
        <Card title={'Cadastrar alerta'}>
            <form className='w-full' onSubmit={handleSubmit}>
                <div className='grid grid-cols-6 gap-x-4 gap-y-8'>
                    <div className='col-span-2'>
                        <label className='alt-light-color-text mb-2' htmlFor="station">Estação</label>
                        <select
                            id="station"
                            className='form-input'
                            value={selectedStation}
                            onChange={(e) => setSelectedStation(e.target.value)}
                        >
                            <option value="">Selecione uma estação</option>
                            {stations.map(station => (
                                <option key={station.id_estacao} value={station.id_estacao}>
                                    {station.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='col-span-4'>
                        <label className='alt-light-color-text mb-2' htmlFor="titulo">Título</label>
                        <input
                            type="text"
                            className='form-input'
                            id="titulo"
                            value={formData.titulo}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="operador">Condição</label>
                        <select
                            className="form-input col-span-2"
                            id="operador"
                            value={formData.operador}
                            onChange={handleInputChange}
                        >
                            <option value={">"}>Maior que</option>
                            <option value={"<"}>Menor que</option>
                            <option value={"="}>Igual</option>
                            <option value={">="}>Maior igual que</option>
                            <option value={"<="}>Menor igual que</option>
                        </select>
                    </div>

                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="valor">Valor</label>
                        <input
                            type="text"
                            className='form-input'
                            id="valor"
                            value={formData.valor}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-span-6">
                        <label className='alt-light-color-text mb-2' htmlFor="id_tipo_parametro">Parâmetro</label>
                        <select
                            className="form-input col-span-2"
                            id="id_tipo_parametro"
                            value={formData.id_tipo_parametro}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione um parâmetro</option>
                            {parametros.map(param => (
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
                                        selectedUsers.includes(user.id_usuario) ? 'bg-[#292988]' : ''
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
                        <label className='alt-light-color-text mb-2' htmlFor="texto">Mensagem</label>
                        <textarea
                            className='form-input'
                            id="texto"
                            rows={10}
                            value={formData.texto}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button className='submit-button mt-8' type="submit">
                    Enviar
                </button>
            </form>
        </Card>
    )
}

export default AlertForm
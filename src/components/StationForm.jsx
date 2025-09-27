import { React, useEffect, useState } from 'react'
import Card from './Card'
import ParamModal from './ParamModal'
import { PlusIcon, CheckIcon } from '@phosphor-icons/react'
import api from '../api/api'
import { toast } from 'react-toastify'

// TODO: Adicionar zod + react hook form
function StationForm({ onStationCreation }) {
    const states = [
        "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT",
        "MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO",
        "RR","SC","SP","SE","TO"
    ]
    
    const [params, setParams] = useState([])
    const [selectedParams, setSelectedParams] = useState([])
    const [editingParam, setEditingParam] = useState(null)

    const [modalIsOpen, setModalisOpen] = useState(false)

    const [uuid, setUuid] = useState('')
    const [name, setName] = useState('')
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    
    const openModal = () => {
        setModalisOpen(true)
    }

    const closeModal = () => {
        setModalisOpen(false)
    }

    const handleEditParam = (param) => {
        setEditingParam(param)
        setModalisOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const address = `${neighborhood} - ${city}/${state}`
        
        const payload = {
            id_estacao: uuid,
            nome: name,
            endereco: address,
            latitude: lat ? parseFloat(lat) : null,
            longitude: long ? parseFloat(long) : null,
            id_usuario: 1
        }

        try {
            const response = await api.post('/stations', payload)
            console.log('station created: ', response.data)

            setUuid('')
            setName('')
            setLat('')
            setLong('')
            setState('')
            setCity('')
            setNeighborhood('')

            toast.success('Estação cadastrada com sucesso')
            onStationCreation()
        } catch (err) {
            toast.error(`Erro ao cadastrar estação`)
            console.error('Error creating station: ', err)
        }
    }

    const fetchParams = async () => {
        try {
            const response = await api.get('/typeParameters')
            setParams(response.data || [])
        } catch (err) {
            console.error("Erro ao buscar parâmetros:", err)
            toast.error("Erro ao carregar parâmetros")
        }
    }

    const handleCheckboxChange = (param) => {
        setSelectedParams((prev) =>
            prev.includes(param)
                ? prev.filter((p) => p !== param)
                : [...prev, param]
        )
    }

    useEffect(() => {
        fetchParams()
    }, [])

    return (
        <Card title={'Cadastrar estação'}>
            <form className='w-full' onSubmit={handleSubmit}>
                <div className='grid grid-cols-6 gap-x-4 gap-y-8'>
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">UUID da estação</label>
                        <input type="text" className='form-input' value={uuid} onChange={(e) => setUuid(e.target.value)} />
                    </div>

                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Nome</label>
                        <input type="text" className='form-input' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Latitude</label>
                        <input type="number" step={"any"}  min="-90" max="90" className='form-input' value={lat} onChange={(e) => setLat(e.target.value)} />
                    </div>
                    
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Longitude</label>
                        <input type="number" step={"any"}  min="-90" max="90" className='form-input' value={long} onChange={(e) => setLong(e.target.value)} />
                    </div>
                    
                    <div className="col-span-2">
                        <label className='alt-light-color-text mb-2' htmlFor="">Estado</label>
                        <select
                            id="estado"
                            className='form-input'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                            {states.map((uf) => (
                                <option key={uf} value={uf} className='alt-dark-color-3-bg'>{uf}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-span-4">
                        <label className='alt-light-color-text mb-2' htmlFor="">Cidade</label>
                        <input type="text" className='form-input' value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    
                    <div className='col-span-6'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Bairro</label>
                        <input type="text" className='form-input' value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                    </div>
                    
                </div>

                <div className='mt-12 flex items-center justify-between'>
                    <h2 className='text-3xl'>Parâmetros</h2>
                    <PlusIcon size={24} className='green-color-text cursor-pointer' onClick={openModal} />
                </div>
                            
                <div className='grid grid-cols-4 mt-4 gap-y-2'>
                    {params.map((param) => (
                        <div 
                        key={param.id_tipo_parametro} 
                        className='col-span-1 flex items-center relative group'
                            >
                            <input
                                id={`param-${param.id_tipo_parametro}`}
                                type='checkbox'
                                name='param'
                                value={param.id_tipo_parametro}
                                checked={selectedParams.includes(param.id_tipo_parametro)}
                                onChange={() => handleCheckboxChange(param.id_tipo_parametro)}
                                className='hidden'
                            />
                            <div
                                className={`h-6 w-6 rounded-md transition 
                                flex items-center justify-center
                                ${selectedParams.includes(param.id_tipo_parametro) ? 'bg-[#292988]' : 'bg-[#262730]'}`}
                            >
                                {selectedParams.includes(param.id_tipo_parametro) && (
                                <CheckIcon size={14} className='text-white' />
                                )}
                            </div>
                            <label
                                htmlFor={`param-${param.id_tipo_parametro}`}
                                className='cursor-pointer px-3 py-1'
                            >
                                {param.nome}
                            </label>

                            <div className="absolute left-0 top-full mt-2 w-max max-w-xs bg-black text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition z-10">
                                <p><b>Unidade:</b> {param.unidade || '-'}</p>
                                <p><b>Fator:</b> {param.fator}</p>
                                <p><b>Polinômio:</b> {param.polinomio}</p>
                                <p><b>Offset:</b> {param.offset}</p>
                                <p 
                                    className='text-blue-300 cursor-pointer mt-2'
                                    onClick={() => handleEditParam(param)}
                                >Editar</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button className='submit-button mt-8'>
                    Enviar
                </button>
            </form>

            {
                modalIsOpen &&
                <ParamModal closeModal={closeModal} editingParam={editingParam} onUpdate={fetchParams} />
            }
        </Card>
    )
}

export default StationForm

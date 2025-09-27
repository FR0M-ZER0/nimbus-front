import { React, useState } from 'react'
import Card from './Card'
import ParamModal from './ParamModal'
import { PlusIcon, CheckIcon } from '@phosphor-icons/react'
import api from '../api/api'
import { toast } from 'react-toastify'

// TODO: Adicionar zod + react hook form
function StationForm({ onStationCreation }) {
    const params = ['Umidade', 'Pluvimétrico 0.25', 'Pluviométrico 0.5', 'Vento', 'xyz', 'etc']

    const states = [
        "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT",
        "MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO",
        "RR","SC","SP","SE","TO"
    ]

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
                            
                <div className='grid grid-cols-4 mt-4'>
                    {params.map((param, index) => (
                        <div key={index} className='col-span-1 flex items-center'>
                            <input
                                id={`param-${index}`}
                                type='checkbox'
                                name='param'
                                value={param}
                                className='peer hidden'
                            />
                            {/* TODO: Controlar o valor do input por controle de estado via hook */}
                            <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                            </div>
                            <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                            <label
                                htmlFor={`param-${index}`}
                                className='cursor-pointer px-3 py-1'
                            >
                                {param}
                            </label>
                        </div>
                    ))}
                </div>

                <button className='submit-button mt-8'>
                    Enviar
                </button>
            </form>

            {
                modalIsOpen &&
                <ParamModal closeModal={closeModal} />
            }
        </Card>
    )
}

export default StationForm

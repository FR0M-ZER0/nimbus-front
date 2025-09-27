import React, { useEffect, useState } from 'react'
import TabModal from './TabModal'
import StationImage from '../assets/station_image.svg'
import { TrashIcon, PencilSimpleIcon, CheckIcon, CalendarDotsIcon } from '@phosphor-icons/react'
import api from '../api/api'
import { toast } from 'react-toastify'

function StationModal({ closeModal, station, onStationUpdate }) {
    const states = [
        "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT",
        "MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO",
        "RR","SC","SP","SE","TO"
    ]

    const [uuid, setUuid] = useState(station.uid);
    const [name, setName] = useState(station.Nome);
    const [lat, setLat] = useState(station.Lat);
    const [long, setLong] = useState(station.Long);
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [address , setAddress] = useState('')

    const fetchAddress = async () => {
        try {
            const response = await api.get(`/stations/${station.uid}`)
            setAddress(response.data.endereco)
        } catch (err) {
            console.error('Não foi possível obter endereço da estação: ', err)
        }
    }

    const handleUpdate = async () => {
        const address = `${neighborhood} - ${city}/${state}`;
        const payload = {
            id_estacao: uuid,
            nome: name,
            endereco: address,
            latitude: lat ? parseFloat(lat) : null,
            longitude: long ? parseFloat(long) : null,
            id_usuario: 1
        }

        try {
            await api.put(`/stations/${uuid}`, payload)
            toast.info('Estação atualizada com sucesso')
            onStationUpdate()
            closeModal()
        } catch (err) {
            console.error('Erro ao atualizar estação: ', err)
            toast.error('Não foi possível atualizar a estação')
        }
    }

    useEffect(() => {
        if (address) {
            const [n, rest] = address.split(' - ')
            const [c, s] = (rest || '').split('/')
            setNeighborhood(n || '')
            setCity(c || '')
            setState(s || '')
        }
    }, [address])

    useEffect(() => {
        fetchAddress()
    }, [station])

    return (
        <TabModal
            tabName={'Estações'}
            onClose={closeModal} 
            tabContent={
                <>
                    <div className='flex'>
                        <div className='mr-4'>
                            <img src={station.image} alt="" width={120} />
                            <div className='flex justify-center space-x-6'>
                                <PencilSimpleIcon size={20} className='cursor-pointer' />
                                <TrashIcon size={20} className='cursor-pointer' />
                            </div>
                        </div>
                        <div className='grid grid-cols-7 flex-1 gap-x-10'>
                            <div className='col-span-1'>
                                <label htmlFor="" className='mb-2'>UID</label>
                                <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' value={uuid} onChange={e => setUuid(e.target.value)} />
                            </div>
                            <div className='col-span-2'>
                                <label htmlFor="" className='mb-2'>Nome</label>
                                <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className='col-span-2'>
                                <label htmlFor="" className='mb-2'>Lat</label>
                                <input type="number" step="any" min="-90" max="90" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' value={lat} onChange={e => setLat(e.target.value)} />
                            </div>
                            <div className='col-span-2'>
                                <label htmlFor="" className='mb-2'>Long</label>
                                <input type="number" step="any" min="-90" max="90" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' value={long} onChange={e => setLong(e.target.value)} />
                            </div>
                            <div className='col-span-1'>
                                <label htmlFor="" className='mb-4'>Estado</label>
                                <select
                                    id="estado"
                                    className='py-2 border-b-1 border-[#D9D9D9] w-full px-1'
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    {states.map((uf) => (
                                        <option key={uf} value={uf} className='alt-dark-color-3-bg'>{uf}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-span-3'>
                                <label htmlFor="city" className='mb-2'>Cidade</label>
                                <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' value={city} onChange={e => setCity(e.target.value)} />
                            </div>
                            <div className='col-span-3'>
                                <label htmlFor="neighborhood" className='mb-2'>Bairro</label>
                                <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' value={neighborhood} onChange={e => setNeighborhood(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-12 ml-[136px]'>
                        <h2 className='text-2xl alt-light-color-text mb-8'>Parâmetros</h2>
                        <div className='grid grid-cols-7 gap-y-10'>
                            <div className='col-span-1 flex items-center'>
                                {/* TODO: Trocar este conteúdo mockado */}
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                        </div>
                    </div>                            
                </>
            }
            dataTabContent={
                <div>
                    <div className='flex w-full justify-between items-center mb-8'>
                        <div className='flex items-center space-x-2'>
                            <img src={StationImage} alt="station_image" width={54} />
                            <div>
                                <p className='text-xl'>abc123</p>
                                <p className='text-red-500'>Excluir</p>
                            </div>
                        </div>

                        <div className='flex alt-light-color-text space-x-2'>
                            <CalendarDotsIcon size={24} />
                            <p>01/09/2035</p>
                        </div>
                    </div>

                    <div className='flex space-x-4'>
                        <div className='w-[270px]'>
                            <select className='py-2 border-b-1 border-[#D9D9D9] w-full px-1 text-xl font-semibold'>
                                <option value="" selected className='py-1'>SP</option>
                            </select>
                            
                            <table className='w-full mt-8'>
                                <thead className='text-left alt-light-color-text'>
                                    <th className='border-b-1 border-[#9093B4] pb-3'>Horário</th>
                                    <th className='border-b-1 border-[#9093B4] pb-3'>Valor</th>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className='pt-8 pb-3 border-b-1 border-[#9093B4]'>09:41</td>
                                        <td className='pt-8 pb-3 border-b-1 border-[#9093B4]'>0.41 L</td>
                                    </tr>
                                    <tr>
                                        <td className='pt-8 pb-3 border-b-1 border-[#9093B4]'>09:41</td>
                                        <td className='pt-8 pb-3 border-b-1 border-[#9093B4]'>0.41 L</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='flex-1'>
                            {/* TODO: Colocar o chart */}
                            <div className='main-dark-color-bg w-full h-full rounded-lg'>
                            </div>
                        </div>
                    </div>
                </div>
            }
            onSave={handleUpdate}
        />
    )
}

export default StationModal

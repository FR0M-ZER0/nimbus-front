import React, { useEffect, useState, useRef } from 'react'
import TabModal from './TabModal'
import StationImage from '../assets/station_image.svg'
import { TrashIcon, PencilSimpleIcon, CheckIcon, CalendarDotsIcon } from '@phosphor-icons/react'
import api from '../api/api'
import { toast } from 'react-toastify'
import MeasureChart from './MeasureChart'

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

    const [params, setParams] = useState([])
    const [selectedParamTypeIds, setSelectedParamTypeIds] = useState([])
    const [existingParamRecords, setExistingParamRecords] = useState([])

    const [stationParams, setStationParams] = useState([])
    const [measures, setMeasures] = useState([])
    const [paramId, setParamId] = useState(1)
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date()
        const day = String(today.getDate()).padStart(2, '0')
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const year = today.getFullYear()
        return `${day}/${month}/${year}`
    })
    const dateInputRef = useRef(null)

    const fetchStationDetails = async () => {
        try {
            const stationRes = await api.get(`/stations/${station.uid}`)
            const fullStation = stationRes.data

            const existingParams = fullStation.parametros || []
            const existingTipoIds = existingParams.map(p => p.id_tipo_parametro)
            
            setExistingParamRecords(existingParams)
            setSelectedParamTypeIds(existingTipoIds)

            if (fullStation.endereco) {
                const [n, rest] = fullStation.endereco.split(' - ')
                const [c, s] = (rest || '').split('/')
                setNeighborhood(n || '')
                setCity(c || '')
                setState(s || '')
            }
        } catch (err) {
            console.error('Erro ao carregar detalhes da estação:', err)
            toast.error('Erro ao carregar dados da estação')
        }
    }

    const fetchAllTypeParameters = async () => {
        try {
            const res = await api.get('/typeParameters');
            setParams(res.data || [])
        } catch (err) {
            console.error('Erro ao carregar tipos de parâmetro:', err)
            toast.error('Erro ao carregar parâmetros disponíveis')
        }
    }

    const fetchStationParams = async () => {
        try {
            const response = await api.get(`/parameters/station/${station.uid}`)
            setStationParams(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchMeasures = async (paramId, date) => {
        try {
            const response = await api.get(`/measure/params/${paramId}`, {
                params: { date }
            })
            setMeasures(response.data)
        } catch(err) {
            console.error(err)
        }
    }

    const handleUpdate = async () => {
        const address = `${neighborhood} - ${city}/${state}`
        const payload = {
            nome: name,
            endereco: address,
            latitude: lat ? parseFloat(lat) : null,
            longitude: long ? parseFloat(long) : null,
            id_usuario: 1
        }

        try {
            await api.put(`/stations/${uuid}`, payload)

            const existingTipoIds = existingParamRecords.map(p => p.id_tipo_parametro)
            const currentSelection = selectedParamTypeIds

            const toDelete = existingParamRecords.filter(
                param => !currentSelection.includes(param.id_tipo_parametro)
            )

            const toCreate = currentSelection.filter(
                tipoId => !existingTipoIds.includes(tipoId)
            )

            await Promise.all(
                toDelete.map(param => api.delete(`/parameters/${param.id_parametro}`))
            )

            await Promise.all(
                toCreate.map(tipoId =>
                    api.post('/parameters', {
                    id_estacao: uuid,
                    id_tipo_parametro: tipoId,
                    })
                )
            )

            toast.info('Estação atualizada com sucesso')
            onStationUpdate()
            closeModal()
        } catch (err) {
            console.error('Erro ao atualizar estação:', err)
            toast.error('Não foi possível atualizar a estação')
        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir esta estação?')
        if (!confirmDelete) return

        try {
            await api.delete(`/stations/${uuid}`)
            toast.info('Estação excluída com sucesso')
            onStationUpdate()
            closeModal()
        } catch (err) {
            console.error('Erro ao excluir estação: ', err)
            toast.error('Não foi possível excluir a estação')
        }
    }

    const handleCheckboxChange = (tipoParametroId) => {
        setSelectedParamTypeIds(prev =>
            prev.includes(tipoParametroId)
            ? prev.filter(id => id !== tipoParametroId)
            : [...prev, tipoParametroId]
        )
    }

    useEffect(() => {
        if (station?.uid) {
            fetchStationDetails()
            fetchAllTypeParameters()
            fetchStationParams()
        }
    }, [station])

    useEffect(() => {
        if (paramId && selectedDate) {
            fetchMeasures(paramId, selectedDate)
        }
    }, [paramId, selectedDate])

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
                            {params.map((param) => {
                                const isChecked = selectedParamTypeIds.includes(param.id_tipo_parametro)
                                return (
                                    <div 
                                        key={param.id_tipo_parametro} 
                                        className="col-span-1 flex items-center relative group cursor-pointer"
                                        onClick={() => handleCheckboxChange(param.id_tipo_parametro)}
                                    >
                                        <div
                                            className={`h-6 w-6 rounded-md transition flex items-center justify-center
                                            ${selectedParamTypeIds.includes(param.id_tipo_parametro) ? 'bg-[#292988]' : 'bg-[#262730]'}`}
                                        >
                                            {selectedParamTypeIds.includes(param.id_tipo_parametro) && (
                                            <CheckIcon size={14} className="text-white" />
                                            )}
                                        </div>
                                        
                                        <span className="px-3 py-1">
                                            {param.nome}
                                        </span>

                                        <div className="absolute left-0 top-full mt-2 w-max max-w-xs bg-black text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition z-10">
                                            <p><b>Unidade:</b> {param.unidade || '-'}</p>
                                            <p><b>Fator:</b> {param.fator}</p>
                                            <p><b>Polinômio:</b> {param.polinomio}</p>
                                            <p><b>Offset:</b> {param.offset}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>                            
                </>
            }
            dataTabContent={
                <div className='mb-6'>
                    <div className='flex w-full justify-between items-center mb-8'>
                        <div className='flex items-center space-x-2'>
                            <img src={StationImage} alt="station_image" width={54} />
                            <div>
                                <p className='text-xl'>abc123</p>
                            </div>
                        </div>

                        <div className='flex alt-light-color-text space-x-2 cursor-pointer' onClick={() => dateInputRef.current.showPicker()}>
                            <CalendarDotsIcon size={24} />
                            <p>{selectedDate}</p>
                        </div>
                        <input
                            type="date"
                            ref={dateInputRef}
                            value={(() => {
                                const [dd, mm, yyyy] = selectedDate.split('/');
                                return `${yyyy}-${mm}-${dd}`;
                            })()}
                            onChange={(e) => {
                                const [yyyy, mm, dd] = e.target.value.split('-');
                                setSelectedDate(`${dd}/${mm}/${yyyy}`);
                            }}
                            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', right: 0 }}
                        />
                    </div>

                    <div className='flex space-x-4'>
                        <div className='w-[270px] max-h-[400px] overflow-y-auto'>
                            <select
                                className='py-2 border-b-1 border-[#D9D9D9] w-full px-1 text-xl font-semibold'
                                value={paramId}
                                onChange={e => setParamId(e.target.value)}
                            >
                                {stationParams
                                    .map((param) => (
                                        <option key={param.id_parametro} value={param.id_parametro} className='alt-dark-color-3-bg'>
                                            {param.tipo_parametro.nome}
                                        </option>
                                    ))
                                }
                            </select>
                            
                            <table className='w-full mt-8 overflow-y-auto max-h-[300px]'>
                                <thead className='text-left alt-light-color-text'>
                                    <th className='border-b-1 border-[#9093B4] pb-3'>Horário</th>
                                    <th className='border-b-1 border-[#9093B4] pb-3'>Valor</th>
                                </thead>

                                <tbody>
                                    {measures.data && measures.data.length > 0 ? (
                                        measures.data.map((measure) => (
                                            <tr key={measure.id_medida}>
                                                <td className='pt-8 pb-3 border-b-1 border-[#9093B4]'>{measure.data_hora}</td>
                                                <td className='pt-8 pb-3 border-b-1 border-[#9093B4]'>{measure.valor}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2} className='pt-8 pb-3 text-center border-b-1 border-[#9093B4]'>
                                                Nenhuma medida encontrada
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className='flex-1'>
                            <div className='main-dark-color-bg w-full h-full rounded-lg'>
                                <MeasureChart
                                    data={[
                                        {
                                        id: 'Valor',
                                        color: 'hsl(210, 70%, 50%)',
                                        data: (measures.data?.slice() || [])
                                            .sort((a, b) => a.data_hora.localeCompare(b.data_hora))
                                            .map(m => ({ x: m.data_hora, y: m.valor })),
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            onSave={handleUpdate}
            onDelete={handleDelete}
        />
    )
}

export default StationModal

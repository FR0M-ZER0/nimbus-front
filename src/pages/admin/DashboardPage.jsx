import React, { useEffect, useState } from 'react'
import DateTimeWatcher from '../../components/DateTimeWatcher'
import DashboardCard from '../../components/DashboardCard'
import { CircuitryIcon, WifiHighIcon, DownloadIcon } from '@phosphor-icons/react'
import InfoCard from '../../components/InfoCard'
import Card from '../../components/Card'
import api from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { activityFetched } from '../../store/slices/activitySlice'

function DashboardPage() {
    const dispatch = useDispatch()
    const summary = useSelector((state) => state.summary.last)

    const [onlineStations, setOnlineStations] = useState(0)
    const [totalStations, setTotalStations] = useState(0)
    const [dataSent, setDataSent] = useState(0)
    const [updateDate, setUpdateDate] = useState('Carregando...')
    const activities = useSelector((state) => state.activity.history)

    // TODO: Adicionar webSocket para os alarmes também
    const [todaysAlarms, setTodaysAlarms] = useState([])

    const fetchTodaysAlarms = async () => {
        try {
            const response = await api.get('/alarms/today')
            setTodaysAlarms(response.data.length)
        } catch (err) {
            console.error('Ocorreu um erro ao obter alarmes: ', err)
        }
    }

    const fetchStations = async () => {
        try {
            const response = await api.get('/station-status/summary')
            setOnlineStations(response.data.online)
            setTotalStations(response.data.total)
            setUpdateDate(response.data.current_date)
        } catch(err) {
            console.error(err)
        }
    }

    const fetchData = async () => {
        try {
            const response = await api.get('/station-log/data-sent')
            setDataSent(response.data.data.total_data_sent_mb)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchTodaysAlarms()
        fetchStations()
        fetchData()
    }, [])

    useEffect(() => {
        if (summary) {
            setOnlineStations(summary.online)
            setTotalStations(summary.total)
            setDataSent(summary.dadosHojeMB)
            setUpdateDate(summary.dataHora)
        }
    }, [summary])

    useEffect(() => {
        const fetchInitialActivity = async () => {
            try {
                const response = await api.get('/logs/activity')
                dispatch(activityFetched(response.data.history))
            } catch (err) {
                console.error('Erro ao buscar histórico inicial: ', err)
            }
        }

        fetchInitialActivity()
    }, [dispatch])

    return (
        <div className='w-full'>
            <DateTimeWatcher />
            
            <div className="grid grid-cols-1 lg:grid-cols-7 lg:gap-x-4 gap-y-8 mt-6">
                <div className='lg:col-span-2'>
                    <DashboardCard
                        title={'Estações conectadas'}
                        dataValue={totalStations}
                        updateDate={updateDate}
                        icon={<CircuitryIcon size={46} />}
                    />
                </div>
                <div className='lg:col-span-3'>
                    <DashboardCard
                        title={'Estações disponíveis'}
                        dataValue={onlineStations}
                        altData={`/${totalStations}`}
                        additionMessage={'Estação abc123 - 09:30'}
                        updateDate={updateDate}
                        icon={<WifiHighIcon size={46} />}
                    />
                </div>
                <div className='lg:col-span-2'>
                    <DashboardCard
                        title={'Dados enviados hoje'}
                        dataValue={dataSent}
                        altData={'Mb'}
                        updateDate={updateDate}
                        icon={<DownloadIcon size={46} />}
                    />
                </div>

                <div className='lg:col-span-2'>
                    <InfoCard>
                        <div className='flex flex-col items-center h-full'>
                            <p className='text-2xl'>
                                Alertas
                            </p>

                            <div className='flex items-center justify-center max-h-84 max-w-84 h-84 w-84 lg:h-full lg:w-full my-8 rounded-full border-28 border-[#BA1200]'>
                                <p className='text-7xl font-semibold red-color-text'>
                                    { todaysAlarms }
                                </p>
                            </div>

                            <p className='text-center'>Estação abc123 - Chuva > 0.5</p>
                        </div>
                    </InfoCard>
                </div>
                <div className='lg:col-span-5'>
                    <Card title={'Última atividades'}>
                        <div className='flex items-center h-full p-6 alt-dark-color-2-bg max-h-[400px] overflow-y-auto'>
                            <table className="w-full border-collapse text-lg mt-16">
                                <tbody>
                                    {activities.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 pt-8 border-b">{ item.date } {`(${item.station})`}: { item.event }</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage

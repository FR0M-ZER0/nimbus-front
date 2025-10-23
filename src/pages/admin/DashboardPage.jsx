import DateTimeWatcher from '../../components/DateTimeWatcher'
import DashboardCard from '../../components/DashboardCard'
import { CircuitryIcon, WifiHighIcon, DownloadIcon } from '@phosphor-icons/react'
import InfoCard from '../../components/InfoCard'
import Card from '../../components/Card'
import api from '../../api/api'

function DashboardPage() {
    const [todaysAlarms, setTodaysAlarms] = useState([])
    const [stations, setStations] = useState([])
    const activities = [
        { date: "01/03/2034 - 09:31", station: "abc123", event: "Enviou dados não processados" },
        { date: "01/03/2034 - 09:34", station: "abc123", event: "Conexão perdida" },
        { date: "01/03/2034 - 09:30", station: "abc123", event: "Retomou conexão" },
        { date: "02/03/2034 - 22:58", station: "xyz899", event: "Dados processados" },
        { date: "01/03/2034 - 09:31", station: "abc123", event: "Enviou um alerta" },
        { date: "01/03/2034 - 09:31", station: "abc123", event: "Enviou dados não processados" },
        { date: "03/03/2034 - 08:15", station: "def456", event: "Enviou dados não processados" },
        { date: "03/03/2034 - 08:20", station: "def456", event: "Conexão perdida" },
        { date: "03/03/2034 - 08:25", station: "def456", event: "Retomou conexão" },
        { date: "03/03/2034 - 12:45", station: "xyz899", event: "Dados processados" },
        { date: "04/03/2034 - 07:20", station: "klm777", event: "Enviou um alerta" },
        { date: "04/03/2034 - 07:25", station: "klm777", event: "Enviou dados não processados" },
        { date: "04/03/2034 - 18:10", station: "def456", event: "Conexão perdida" },
        { date: "04/03/2034 - 18:15", station: "def456", event: "Retomou conexão" },
        { date: "05/03/2034 - 09:00", station: "abc123", event: "Dados processados" },
        { date: "05/03/2034 - 09:05", station: "abc123", event: "Enviou um alerta" },
        { date: "05/03/2034 - 14:22", station: "xyz899", event: "Enviou dados não processados" },
        { date: "06/03/2034 - 11:45", station: "klm777", event: "Dados processados" },
        { date: "06/03/2034 - 11:50", station: "klm777", event: "Enviou um alerta" },
        { date: "06/03/2034 - 17:30", station: "def456", event: "Conexão perdida" },
        { date: "06/03/2034 - 17:35", station: "def456", event: "Retomou conexão" },
    ]

    const fetchTodaysAlarms = async () => {
        try {
            const response = await api.get('/alarms/today')
            setTodaysAlarms(response.data.length)
            console.log(response.data)
        } catch (err) {
            console.error('Ocorreu um erro ao obter alarmes: ', err)
        }
    }

    const fetchStations = async () => {
        try {
            const response = await api.get('/stations')
            setStations(response.data.data.length)
            console.log(response.data)
        } catch(err) {
            console.error('Ocorreu um erro ao obter estações: ', err)
        }
    }

    useEffect(() => {
        fetchTodaysAlarms()
        fetchStations()
    }, [])

    return (
        <div className='w-full'>
            <DateTimeWatcher />
            
            <div className="grid grid-cols-1 lg:grid-cols-7 lg:gap-x-4 gap-y-8 mt-6">
                <div className='lg:col-span-2'>
                    <DashboardCard
                        title={'Estações conectadas'}
                        dataValue={stations}
                        updateDate={'02/04/2035 às 20:30'}
                        icon={<CircuitryIcon size={46} />}
                    />
                </div>
                <div className='lg:col-span-3'>
                    <DashboardCard
                        title={'Estações disponíveis'}
                        dataValue={22}
                        altData={'/24'}
                        additionMessage={'Estação abc123 - 09:30'}
                        updateDate={'02/04/2035 às 20:30'}
                        icon={<WifiHighIcon size={46} />}
                    />
                </div>
                <div className='lg:col-span-2'>
                    <DashboardCard
                        title={'Estações conectadas'}
                        dataValue={46}
                        altData={'Mb'}
                        updateDate={'02/04/2035 às 20:30'}
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

                            <p className='text-center'>Estação abc123 - Chuva {'>'} 0.5</p>
                        </div>
                    </InfoCard>
                </div>
                <div className='lg:col-span-5'>
                    <Card title={'Última atividades'}>
                        <div className='flex items-center h-full p-6 alt-dark-color-2-bg max-h-[400px] overflow-y-auto'>
                            <table className="w-full border-collapse text-lg">
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

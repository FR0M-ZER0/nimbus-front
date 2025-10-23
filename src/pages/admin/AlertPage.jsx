import Calendar from '../../components/Calendar'
import LastAlerts from '../../components/LastAlerts'
import AlertsTable from '../../components/AlertsTable'
import AlertForm from '../../components/AlertForm'
import SavedAlerts from '../../components/SavedAlerts'
import api from '../../api/api'

function AlertPage() {
    const [alerts, setAlerts] = useState([])
    const [savedAlerts, setSavedAlerts] = useState([])
    const [loading, setLoading] = useState(false)
    const [savedAlertsLoading, setSavedAlertsLoading] = useState(false)

    const fetchAlerts = async () => {
        setLoading(true)
        try {
            const { data } = await api.get('/alarms')

            const formatted = data.map(item => {
                const createdAt = new Date(item.created_at)
                const formattedDate = createdAt.toLocaleDateString('pt-BR') + 
                    ' às ' + createdAt.toLocaleTimeString('pt-BR', { hour12: false })

                return {
                    Título: item.alerta.titulo,
                    Texto: item.alerta.texto,
                    Valor: item.medida.valor,
                    Usuário: item.usuario.nome,
                    Data: formattedDate
                }
            })

            setAlerts(formatted)
        } catch (error) {
            console.error('Erro ao buscar alertas:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSavedAlerts = async () => {
        setSavedAlertsLoading(true)
        try {
            const { data } = await api.get('/alerts')
            setSavedAlerts(data)
        } catch (error) {
            console.error('Erro ao buscar saved alerts:', error)
        } finally {
            setSavedAlertsLoading(false)
        }
    }

    useEffect(() => {
        fetchAlerts()
        fetchSavedAlerts()
    }, [])
    return (
        <div className='w-full space-y-8'>
            <div className='flex space-x-6'>
                <div className='max-w-[1400px] w-full'>
                    <Calendar />
                </div>
                <div className='flex-1'>
                    <LastAlerts />
                </div>
            </div>

            <div className='flex space-x-6'>
                <div className='max-w-[720px] w-full'>
                    <AlertForm onAdd={fetchSavedAlerts} />
                </div>

                <div className='flex-1'>
                    <SavedAlerts alerts={savedAlerts} onDelete={fetchSavedAlerts} onUpdate={fetchSavedAlerts} onLoading={savedAlertsLoading} />
                </div>
            </div>

            <div className='mb-8'>
                <AlertsTable alerts={alerts} onLoading={loading} />
            </div>
        </div>
    )
}

export default AlertPage

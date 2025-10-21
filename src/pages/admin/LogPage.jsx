import React, { useEffect, useState } from 'react'
import loadingAnimation from '../../assets/loading.gif'
import Card from '../../components/Card'
import Filter from '../../components/Filter'
import api from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { activityFetched } from '../../store/slices/activitySlice'

const LogLevelBadge = ({ level }) => {
    return (
        <span className={`px-3 py-2 rounded-2xl main-dark-color-text font-semibold log-badge ${level?.toLowerCase() || ''}`}>
            {level || 'N/A'}
        </span>
    )
}

/**
 * TODO: Alterar o activitySlice para fazer com que ele retorne mais de 30 registros por vez - MAX_HISTORY = 30
 * Assim é possível colocar a paginação aqui
 */
function LogPage() {
    const dispatch = useDispatch()
    const logs = useSelector((state) => state.activity.history)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const [searchTerm, setSearchTerm] = useState('')
    const [logLevelFilter, setLogLevelFilter] = useState('todos')

    const fetchLogs = async () => {
        setIsLoading(true)
        setError('')
        try {
            const response = await api.get('/logs/full-activity')
            dispatch(activityFetched(response.data.history || []))
        } catch (err) {
            console.error(err)
            setError('Falha ao carregar o histórico. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchLogs()
    }, [dispatch])

    const filteredLogs = logs
        .filter(log => {
            if (logLevelFilter === 'todos') return true
            return log.status?.toLowerCase() === logLevelFilter
        })
        .filter(log =>
            log.event?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.station?.toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <div className='w-full'>
            <Card title={'Histórico de atividades'}>
                <Filter
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    logLevelFilter={logLevelFilter}
                    onFilterChange={setLogLevelFilter}
                />

                {error && <div className="error-message">{error}</div>}

                {isLoading ? (
                    <div className='w-full flex justify-center mt-8'>
                        <img src={loadingAnimation} alt="loading" width={160} />
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl mt-8">
                        <table className="min-w-full border-collapse text-left">
                            <thead>
                                <tr>
                                    <th className="py-3 px-4">Data</th>
                                    <th className="py-3 px-4">Nível</th>
                                    <th className="py-3 px-4">Origem</th>
                                    <th className="py-3 px-4">Descrição</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-[#9093B4]">
                                {filteredLogs.map((log, index) => (
                                    <tr key={index} className="transition-colors text-sm">
                                        <td className="py-5 px-4">{log.date}</td>
                                        <td className="py-5 px-4">
                                            <LogLevelBadge level={log.status || 'INFO'} />
                                        </td>
                                        <td className="py-5 px-4">{log.station}</td>
                                        <td className="py-5 px-4">{log.event}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    )
}

export default LogPage

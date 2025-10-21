import React, { useState, useEffect } from 'react'
import loadingAnimation from '../../assets/loading.gif'
import Card from '../../components/Card'
import Filter from '../../components/Filter'

const mockLogs = [
    { id: 1, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), level: 'INFO', source: 'Usuário: admin@tecsus.com.br', message: 'Login realizado com sucesso.' },
    { id: 2, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), level: 'ALERT', source: 'Estação: XYZ-123', message: 'Nível de bateria baixo (15%).' },
    { id: 3, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), level: 'ERROR', source: 'Sistema', message: 'Falha ao conectar com o servidor de dados meteorológicos.' },
    { id: 4, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), level: 'INFO', source: 'Usuário: joao.silva@tecsus.com.br', message: 'Novo usuário "maria.oliveira" criado.' },
    { id: 5, timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(), level: 'ALERT', source: 'Estação: ABC-456', message: 'Sensor de umidade não está respondendo.' },
    { id: 6, timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), level: 'INFO', source: 'Sistema', message: 'Backup diário completado com sucesso.' },
    { id: 7, timestamp: new Date(Date.now() - 49 * 60 * 60 * 1000).toISOString(), level: 'ERROR', source: 'Estação: XYZ-123', message: 'Transmissão de dados falhou após 3 tentativas.' },
]

const api = {
    getLogs: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return [...mockLogs]
    },
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </svg>
)

const LogLevelBadge = ({ level }) => {
    const levelClass = `log-badge ${level.toLowerCase()}`
    return <span className={levelClass}>{level}</span>
}

function LogPage() {
    const [logs, setLogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const [searchTerm, setSearchTerm] = useState('')
    const [logLevelFilter, setLogLevelFilter] = useState('todos')

    const fetchLogs = async () => {
        setIsLoading(true)
        setError('')
        try {
            const data = await api.getLogs()
            setLogs(data)
        } catch (err) {
            setError('Falha ao carregar o histórico. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchLogs()
    }, [])

    const filteredLogs = logs
        .filter(log => {
            if (logLevelFilter === 'todos') return true
            return log.level.toLowerCase() === logLevelFilter
        })
        .filter(log =>
            log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.source.toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <div className='w-full'>
            <Card title={'Histórico de atividades'}>
                <Filter />

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
                                <th className="py-3 px-4">Data / Hora</th>
                                <th className="py-3 px-4">Nível</th>
                                <th className="py-3 px-4">Origem</th>
                                <th className="py-3 px-4">Descrição</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-[#9093B4]">
                                {filteredLogs.map(log => (
                                <tr
                                    key={log.id}
                                    className="transition-colors text-sm"
                                >
                                    <td className="py-5 px-4">
                                        {new Date(log.timestamp).toLocaleString('pt-BR')}
                                    </td>
                                    <td className="py-5 px-4">
                                        <LogLevelBadge level={log.level} />
                                    </td>
                                    <td className="py-5 px-4">{log.source}</td>
                                    <td className="py-5 px-4">{log.message}</td>
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

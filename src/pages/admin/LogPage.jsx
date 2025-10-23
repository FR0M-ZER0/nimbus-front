import loadingAnimation from '../../assets/loading.gif'
import { useState, useEffect } from 'react';


const mockLogs = [
    { id: 1, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), level: 'INFO', source: 'Usuário: admin@tecsus.com.br', message: 'Login realizado com sucesso.' },
    { id: 2, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), level: 'ALERT', source: 'Estação: XYZ-123', message: 'Nível de bateria baixo (15%).' },
    { id: 3, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), level: 'ERROR', source: 'Sistema', message: 'Falha ao conectar com o servidor de dados meteorológicos.' },
    { id: 4, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), level: 'INFO', source: 'Usuário: joao.silva@tecsus.com.br', message: 'Novo usuário "maria.oliveira" criado.' },
    { id: 5, timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(), level: 'ALERT', source: 'Estação: ABC-456', message: 'Sensor de umidade não está respondendo.' },
    { id: 6, timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), level: 'INFO', source: 'Sistema', message: 'Backup diário completado com sucesso.' },
    { id: 7, timestamp: new Date(Date.now() - 49 * 60 * 60 * 1000).toISOString(), level: 'ERROR', source: 'Estação: XYZ-123', message: 'Transmissão de dados falhou após 3 tentativas.' },
];

const api = {
    getLogs: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        return [...mockLogs];
    },
};

const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" /> </svg>);
const LogLevelBadge = ({ level }) => {
    const levelClass = `log-badge ${level.toLowerCase()}`;
    return <span className={levelClass}>{level}</span>;
};

function LogPage() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [logLevelFilter, setLogLevelFilter] = useState('todos'); // 'todos', 'info', 'alert', 'error'

    const fetchLogs = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await api.getLogs();
            setLogs(data);
        } catch (err) {
            setError('Falha ao carregar o histórico. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    // Lógica para filtrar os logs com base nos filtros selecionados
    const filteredLogs = logs
        .filter(log => {
            if (logLevelFilter === 'todos') return true;
            return log.level.toLowerCase() === logLevelFilter;
        })
        .filter(log =>
            log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.source.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <>
            <div className="log-page-container w-full">
                <div className="log-header">
                    <h1>Histórico de Atividades</h1>
                </div>

                <div className="filters-container">
                    <div className="search-container">
                        <span className="search-icon"><SearchIcon /></span>
                        <input
                            type="text"
                            placeholder="Pesquisar na origem ou mensagem..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="level-filter"
                        value={logLevelFilter}
                        onChange={(e) => setLogLevelFilter(e.target.value)}
                    >
                        <option value="todos">Todos os Níveis</option>
                        <option value="info">Info</option>
                        <option value="alert">Alerta</option>
                        <option value="error">Erro</option>
                    </select>
                </div>

                {error && <div className="error-message">{error}</div>}

                {isLoading ? (
                    <div className='w-full flex justify-center'>
                        <img src={loadingAnimation} alt="loading" width={160} />
                    </div>) : (
                    <div className="table-container">
                        <table className="logs-table">
                            <thead>
                                <tr>
                                    <th>Data / Hora</th>
                                    <th>Nível</th>
                                    <th>Origem</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map(log => (
                                    <tr key={log.id}>
                                        <td>{new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                                        <td><LogLevelBadge level={log.level} /></td>
                                        <td>{log.source}</td>
                                        <td>{log.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default LogPage;
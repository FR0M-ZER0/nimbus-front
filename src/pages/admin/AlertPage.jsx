// src/pages/admin/AlertPage.jsx
import Calendar from '../../components/Calendar'
import LastAlerts from '../../components/LastAlerts'
import AlertsTable from '../../components/AlertsTable'
import AlertForm from '../../components/AlertForm'
import SavedAlerts from '../../components/SavedAlerts'
import api from '../../api/api'
import { useState, useEffect, useCallback } from 'react';

function AlertPage() {
    const [alerts, setAlerts] = useState([])
    const [savedAlerts, setSavedAlerts] = useState([])
    const [loading, setLoading] = useState(false)
    const [savedAlertsLoading, setSavedAlertsLoading] = useState(false)
    
    // Filter and sort state for active alerts (alarms)
    const [alertFilters, setAlertFilters] = useState({
        search: '',
        sortBy: 'data_hora',
        sortOrder: 'desc',
        page: 1,
        limit: 10,
        id_alerta: '',
        valorSearch: '',
        valorMin: '',
        valorMax: ''
    });
    
    // Filter and sort state for saved alerts
    const [savedAlertFilters, setSavedAlertFilters] = useState({
        search: '',
        sortBy: 'data_hora',
        sortOrder: 'desc',
        page: 1,
        limit: 10,
        tipoParametroNome: '',
        tipoAlertaValor: ''
    });

    const fetchAlerts = useCallback(async () => {
        setLoading(true)
        try {
            // Build query parameters
            const params = new URLSearchParams({
                page: alertFilters.page,
                limit: alertFilters.limit,
                sortBy: alertFilters.sortBy,
                sortOrder: alertFilters.sortOrder
            });
            
            if (alertFilters.search) params.append('search', alertFilters.search);
            if (alertFilters.id_alerta) params.append('id_alerta', alertFilters.id_alerta);
            if (alertFilters.valorSearch) params.append('valorSearch', alertFilters.valorSearch);
            if (alertFilters.valorMin) params.append('valorMin', alertFilters.valorMin);
            if (alertFilters.valorMax) params.append('valorMax', alertFilters.valorMax);
            
            const { data } = await api.get(`/alarms?${params.toString()}`)
            
            // Format the data for display
            const formatted = data.data.map(item => {
                const createdAt = new Date(item.created_at)
                const formattedDate = createdAt.toLocaleDateString('pt-BR') + 
                    ' às ' + createdAt.toLocaleTimeString('pt-BR', { hour12: false })

                return {
                    Título: item.alerta.titulo,
                    Texto: item.alerta.texto,
                    Valor: item.valor,
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
    }, [alertFilters]);

    const fetchSavedAlerts = useCallback(async () => {
        setSavedAlertsLoading(true)
        try {
            // Build query parameters
            const params = new URLSearchParams({
                page: savedAlertFilters.page,
                limit: savedAlertFilters.limit,
                sortBy: savedAlertFilters.sortBy,
                sortOrder: savedAlertFilters.sortOrder
            });
            
            if (savedAlertFilters.search) params.append('search', savedAlertFilters.search);
            if (savedAlertFilters.tipoParametroNome) params.append('tipoParametroNome', savedAlertFilters.tipoParametroNome);
            if (savedAlertFilters.tipoAlertaValor) params.append('tipoAlertaValor', savedAlertFilters.tipoAlertaValor);
            
            const { data } = await api.get(`/alerts?${params.toString()}`)
            
            // If your API returns a pagination structure, adjust accordingly
            // This assumes data is the array of alerts
            setSavedAlerts(data.data || data)
        } catch (error) {
            console.error('Erro ao buscar saved alerts:', error)
        } finally {
            setSavedAlertsLoading(false)
        }
    }, [savedAlertFilters]);

    // Initial fetch and when filters change
    useEffect(() => {
        fetchAlerts()
    }, [fetchAlerts]);

    useEffect(() => {
        fetchSavedAlerts()
    }, [fetchSavedAlerts]);

    // Handlers for active alert filters
    const handleAlertSearchChange = (search) => {
        setAlertFilters(prev => ({ ...prev, search, page: 1 }));
    };

    const handleAlertSortChange = (sortBy, sortOrder) => {
        setAlertFilters(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
    };

    const handleAlertFilterChange = (filterValue) => {
        // You could expand this to handle different filter types
        setAlertFilters(prev => ({ ...prev, status: filterValue, page: 1 }));
    };

    // Handlers for saved alert filters
    const handleSavedAlertSearchChange = (search) => {
        setSavedAlertFilters(prev => ({ ...prev, search, page: 1 }));
    };

    const handleSavedAlertSortChange = (sortBy, sortOrder) => {
        setSavedAlertFilters(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
    };

    const handleSavedAlertFilterChange = (filterValue) => {
        // You could expand this to handle different filter types
        setSavedAlertFilters(prev => ({ ...prev, status: filterValue, page: 1 }));
    };

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
                    <AlertForm 
                        onAdd={() => {
                            // Reset to first page when adding new alert
                            setSavedAlertFilters(prev => ({ ...prev, page: 1 }));
                            fetchSavedAlerts();
                        }} 
                    />
                </div>

                <div className='flex-1'>
                    <SavedAlerts 
                        alerts={savedAlerts} 
                        onDelete={() => {
                            // After deletion, refresh the list
                            fetchSavedAlerts();
                        }} 
                        onUpdate={fetchSavedAlerts} 
                        onLoading={savedAlertsLoading}
                        filters={savedAlertFilters}
                        onSearchChange={handleSavedAlertSearchChange}
                        onSortChange={handleSavedAlertSortChange}
                        onFilterChange={handleSavedAlertFilterChange}
                    />
                </div>
            </div>

            <div className='mb-8'>
                <AlertsTable 
                    alerts={alerts} 
                    onLoading={loading}
                    filters={alertFilters}
                    onSearchChange={handleAlertSearchChange}
                    onSortChange={handleAlertSortChange}
                    onFilterChange={handleAlertFilterChange}
                />
            </div>
        </div>
    )
}

export default AlertPage
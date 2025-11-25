// src/pages/admin/StationPage.jsx
import StationForm from '../../components/StationForm'
import StationDownMap from '../../components/StationDownMap'
import StationTable from '../../components/StationTable'
import StationModal from '../../components/StationModal'
import StationImage from '../../assets/station_image.svg'
import api from '../../api/api'
import { useState, useEffect, useCallback } from 'react';

function StationPage() {
    const [stations, setStations] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedStation, setSelectedStation] = useState(null)
    const [loading, setLoading] = useState(false)
    
    // Filter and sort state
    const [filters, setFilters] = useState({
        search: '',
        sortBy: 'data_criacao',
        sortOrder: 'desc',
        status: 'all',
        page: 1,
        limit: 10,
        parameterTypes: '',
        state: ''
    });

    const openModal = (station) => {
        setSelectedStation(station)
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
        setSelectedStation(null)
    }

    const fetchStations = useCallback(async () => {
        setLoading(true)
        try {
            // Build query parameters
            const params = new URLSearchParams({
                page: filters.page,
                limit: filters.limit,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder
            });
            
            if (filters.search) params.append('search', filters.search);
            if (filters.status && filters.status !== 'all') params.append('status', filters.status);
            if (filters.parameterTypes) params.append('parameterTypes', filters.parameterTypes);
            if (filters.state) params.append('state', filters.state);
            
            const response = await api.get(`/stations?${params.toString()}`)
            
            // Process data
            const stationsWithImage = response.data.data.map(station => ({
                image: StationImage,
                uid: station.id_estacao,
                Nome: station.nome,
                Lat: parseFloat(station.latitude),
                Long: parseFloat(station.longitude),
                Params: station.descricao || "Sem descrição",
                address: station.endereco,
                status: station.status || "online", // Assuming your API returns status
            }))
            
            setStations(stationsWithImage)
            
            // If you have pagination metadata in your response, you could set it here
            // setTotalItems(response.data.pagination.total);
        } catch (error) {
            console.error("Erro ao buscar estações:", error)
        } finally {
            setLoading(false)
        }
    }, [filters]);

    // Initial fetch and when filters change
    useEffect(() => {
        fetchStations()
    }, [fetchStations]);

    // Handler for filter changes
    const handleSearchChange = (search) => {
        setFilters(prev => ({ ...prev, search, page: 1 }));
    };

    const handleSortChange = (sortBy, sortOrder) => {
        setFilters(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
    };

    const handleFilterChange = (filterValue) => {
        setFilters(prev => ({ ...prev, status: filterValue, page: 1 }));
    };

    return (
        <div className='w-full'>
            <div className='flex'>
                <div className='max-w-[680px] min-w-[680px]'>
                    <StationForm onStationCreation={() => {
                        fetchStations();
                    }} />
                </div>

                <div className='flex-1'>
                    <StationDownMap stations={stations} />
                </div>
            </div>

            <div className='my-8'>
                <StationTable 
                    stations={stations} 
                    onActionBtnClick={openModal} 
                    onLoading={loading}
                    filters={filters}
                    onSearchChange={handleSearchChange}
                    onSortChange={handleSortChange}
                    onFilterChange={handleFilterChange}
                />
            </div>

            <div>
                {modalIsOpen && (
                    <StationModal 
                        closeModal={closeModal} 
                        station={selectedStation}
                        onStationUpdate={fetchStations}
                    />
                )}
            </div>
        </div>
    )
}

export default StationPage;
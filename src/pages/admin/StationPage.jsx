import { React, useState, useEffect } from 'react'
import StationForm from '../../components/StationForm'
import StationDownMap from '../../components/StationDownMap'
import StationTable from '../../components/StationTable'
import StationModal from '../../components/StationModal'
import StationImage from '../../assets/station_image.svg'
import api from '../../api/api'

function StationPage() {
    const [stations, setStations] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedStation, setSelectedStation] = useState(null)
    const [loading, setLoading] = useState(false)

    const openModal = (station) => {
        setSelectedStation(station)
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
        setSelectedStation(null)
    }

    const fetchStations = async () => {
        setLoading(true)
        try {
            const response = await api.get('/stations')
            // TODO: Adiciona imagens e o status
            const stationsWithImage = response.data.data.map(station => ({
                image: StationImage,
                uid: station.id_estacao,
                Nome: station.nome,
                Lat: parseFloat(station.latitude),
                Long: parseFloat(station.longitude),
                Params: station.descricao || "Sem descrição",
                address: station.endereco,
                status: "online",
            }))
            setStations(stationsWithImage)
        } catch (error) {
            console.error("Erro ao buscar estações:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStations()
    }, [])

    return (
        <div className='w-full'>
            <div className='flex'>
                <div className='max-w-[680px] min-w-[680px]'>
                    <StationForm onStationCreation={fetchStations} />
                </div>

                <div className='flex-1'>
                    <StationDownMap stations={stations} />
                </div>
            </div>

            <div className='my-8'>
                <StationTable stations={stations} onActionBtnClick={openModal} onLoading={loading} />
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

export default StationPage

import { React, useState } from 'react'
import StationForm from '../../components/StationForm'
import StationDownMap from '../../components/StationDownMap'
import StationTable from '../../components/StationTable'
import TabModal from '../../components/TabModal'
import StationImage from '../../assets/station_image.svg'

function StationPage() {
    const stations = [
        {
            image: StationImage,
            uid: "Abc123",
            name: "Umidade da água",
            lat: -23.55052,
            long: -46.633308,
            params: "Umidade - Pluviométrico 0.25 - Vento - Fogo",
            status: "online",
        },
        {
            image: StationImage,
            uid: "Tzi192",
            name: "Pluviométrico 0.5",
            lat: -23.55052,
            long: -46.633308,
            params: "Umidade - Pluviométrico 0.25 - Vento - Fogo",
            status: "offline",
        },
        {
            image: StationImage,
            uid: "Jkl789",
            name: "Estação Central Norte",
            lat: -23.554321,
            long: -46.629987,
            params: "Temperatura - Umidade - Vento",
            status: "online",
        },
        {
            image: StationImage,
            uid: "Lmn456",
            name: "Monitoramento Sul",
            lat: -23.560001,
            long: -46.640123,
            params: "Pluviométrico 1.0 - Fogo",
            status: "offline",
        },
        {
            image: StationImage,
            uid: "Xyz321",
            name: "Estação Leste 2",
            lat: -23.548900,
            long: -46.620100,
            params: "Umidade - Vento - Pluviométrico 0.75",
            status: "online",
        },
        {
            image: StationImage,
            uid: "Opq654",
            name: "Posto de Controle Oeste",
            lat: -23.570540,
            long: -46.655000,
            params: "Fogo - Umidade",
            status: "offline",
        },
        {
            image: StationImage,
            uid: "Rst888",
            name: "Estação Experimental",
            lat: -23.545000,
            long: -46.635000,
            params: "Pluviométrico 0.25 - Temperatura",
            status: "online",
        },
        {
            image: StationImage,
            uid: "Vwx777",
            name: "Monitoramento Águas Claras",
            lat: -23.551100,
            long: -46.628000,
            params: "Umidade - Vento - Fogo",
            status: "online",
        },
    ]

    const [modalIsOpen, setModalisOpen] = useState(false)

    const openModal = () => {
        setModalisOpen(true)
    }

    const closeModal = () => {
        setModalisOpen(false)
    }

    return (
        <div className='w-full'>
            <div className='flex'>
                <div className='max-w-[680px]'>
                    <StationForm />
                </div>

                <div className='flex-1'>
                    <StationDownMap />
                </div>
            </div>

            <div className='mb-8'>
                <StationTable stations={stations} onActionBtnClick={openModal} />
            </div>

            <div>
                {
                    modalIsOpen &&
                    <TabModal tabName={'Estações'} onClose={closeModal} />
                }
            </div>
        </div>
    )
}

export default StationPage

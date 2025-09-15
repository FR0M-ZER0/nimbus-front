import React from 'react'
import StationForm from '../../components/StationForm'
import StationDownMap from '../../components/StationDownMap'
import StationTable from '../../components/StationTable'

function StationPage() {
    const stations = [
        {
            uid: "Abc123",
            name: "Umidade da água",
            lat: -23.55052,
            long: -46.633308,
            params: "Umidade - Pluviométrico 0.25 - Vento - Fogo",
            status: "online",
        },
        {
            uid: "Tzi192",
            name: "Pluviométrico 0.5",
            lat: -23.55052,
            long: -46.633308,
            params: "Umidade - Pluviométrico 0.25 - Vento - Fogo",
            status: "offline",
        },
    ]
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

            <div>
                <StationTable stations={stations} />
            </div>
        </div>
        
    )
}

export default StationPage

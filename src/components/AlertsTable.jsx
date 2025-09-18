import React from 'react'
import Table from './Table'

function AlertsTable() {
    const entries = [
        {
            UID: 'xyz178',
            Nome: 'Pluviométrico 0.25',
            Lat: '-23.123923',
            Lon: '46.123123',
            Aviso: 'Chuva > 0.5',
            Data: '09/20/2035 - 17:51'
        },
        {
            UID: 'xyz178',
            Nome: 'Pluviométrico 0.25',
            Lat: '-23.123923',
            Lon: '46.123123',
            Aviso: 'Chuva > 0.5',
            Data: '09/20/2035 - 17:51'
        },
        {
            UID: 'xyz178',
            Nome: 'Pluviométrico 0.25',
            Lat: '-23.123923',
            Lon: '46.123123',
            Aviso: 'Chuva > 0.5',
            Data: '09/20/2035 - 17:51'
        },
        {
            UID: 'xyz178',
            Nome: 'Pluviométrico 0.25',
            Lat: '-23.123923',
            Lon: '46.123123',
            Aviso: 'Chuva > 0.5',
            Data: '09/20/2035 - 17:51'
        },
        {
            UID: 'xyz178',
            Nome: 'Pluviométrico 0.25',
            Lat: '-23.123923',
            Lon: '46.123123',
            Aviso: 'Chuva > 0.5',
            Data: '09/20/2035 - 17:51'
        },
        {
            UID: 'xyz178',
            Nome: 'Pluviométrico 0.25',
            Lat: '-23.123923',
            Lon: '46.123123',
            Aviso: 'Chuva > 0.5',
            Data: '09/20/2035 - 17:51'
        },
    ]
    return (
        <Table 
            title={'Alertas'} 
            tableHeadEntries={Object.keys(entries[0])} 
            tableBodyEntries={entries} 
        />
    )
}

export default AlertsTable

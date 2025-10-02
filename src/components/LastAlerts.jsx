import React from 'react'
import Card from './Card'

function LastAlerts() {
    const alerts = [
        {
            datetime: '10/09/2035 - 15:39',
            station: 'abc123',
            param: 'chuva',
            operator: '>',
            value: '0.25',
            address: 'São José dos Campos'
        },
        {
            datetime: '10/09/2035 - 15:39',
            station: 'abc123',
            param: 'chuva',
            operator: '>',
            value: '0.25',
            address: 'São José dos Campos'
        },
        {
            datetime: '10/09/2035 - 15:39',
            station: 'abc123',
            param: 'chuva',
            operator: '>',
            value: '0.25',
            address: 'São José dos Campos'
        },
        {
            datetime: '10/09/2035 - 15:39',
            station: 'abc123',
            param: 'chuva',
            operator: '>',
            value: '0.25',
            address: 'São José dos Campos'
        },
        {
            datetime: '10/09/2035 - 15:39',
            station: 'abc123',
            param: 'chuva',
            operator: '>',
            value: '0.25',
            address: 'São José dos Campos'
        },
        {
            datetime: '10/09/2035 - 15:39',
            station: 'abc123',
            param: 'chuva',
            operator: '>',
            value: '0.25',
            address: 'São José dos Campos'
        },
        {
            datetime: '10/09/2035 - 15:39',
            station: 'abc123',
            param: 'chuva',
            operator: '>',
            value: '0.25',
            address: 'São José dos Campos'
        },
    ]
    return (
        <Card title={'Últimos alertas'}>
            <div  className='max-h-[680px] overflow-y-auto space-y-8'>
                {
                    alerts.map((alert, index) => (
                        <div className='px-2 py-6 red-color-bg rounded-lg' key={index}>
                            <p className='font-semibold'>{`${alert.datetime} (Estação ${alert.station}): ${alert.param} ${alert.operator} ${alert.value}`}</p>
                            <p>{alert.address}</p>
                        </div>
                    ))
                }
            </div>
        </Card>
    )
}

export default LastAlerts

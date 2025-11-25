import { useEffect, useState } from 'react'
import Card from './Card'
import api from '../api/api'

function LastAlerts() {
    const [alerts, setAlerts] = useState([])

    const fetchAlerts = async () => {
        try {
            const { data } = await api.get("/alarms")

            const formatted = data.map(a => {
                const date = new Date(a.created_at)
                return {
                    datetime: date.toLocaleDateString('pt-BR') +
                              " - " + date.toLocaleTimeString('pt-BR', { hour12: false }),
                    station: a.medida.parametro.estacao.id_estacao,
                    param: a.medida.parametro.tipo_parametro.nome,
                    operator: a.alerta.tipo_alerta?.operador ?? "",
                    value: a.medida.valor,
                    address: a.medida.parametro.estacao.endereco
                }
            })

            setAlerts(formatted)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchAlerts()
    }, [])

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

import React, { useEffect, useState } from 'react'
import Card from './Card'
import api from '../api/api'

function AlertForm() {
    const [stations, setStations] = useState([])
    const [selectedStation, setSelectedStation] = useState('')
    const [parametros, setParametros] = useState([])

    const fetchStations = async () => {
        try {
            const response = await api.get('/stations')
            setStations(response.data.data)
        } catch (error) {
            console.error("Erro ao carregar estações:", error)
        }
    }

    const fetchParametros = async () => {
        if (!selectedStation) return;
        try {
            const response = await api.get(`/stations/${selectedStation}/tipo-parametros`)
            setParametros(response.data)
        } catch (error) {
            console.error("Erro ao carregar parâmetros:", error)
        }
    }

    useEffect(() => {
        fetchStations()
    }, [])

    useEffect(() => {
        fetchParametros()
    }, [selectedStation])

    return (
        <Card title={'Cadastrar alerta'}>
            <form className='w-full'>
                <div className='grid grid-cols-6 gap-x-4 gap-y-8'>
                    <div className='col-span-2'>
                        <label className='alt-light-color-text mb-2' htmlFor="station">
                            Estação
                        </label>
                        <select
                            id="station"
                            className='form-input'
                            value={selectedStation}
                            onChange={(e) => setSelectedStation(e.target.value)}
                        >
                            <option value="">Selecione uma estação</option>
                            {stations.map(station => (
                                <option key={station.id_estacao} value={station.id_estacao}>
                                    {station.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='col-span-4'>
                        <label className='alt-light-color-text mb-2' htmlFor="titulo">Título</label>
                        <input type="text" className='form-input' id="titulo" />
                    </div>
                    
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="condicao">Condição</label>
						<select className="form-input col-span-2" id="condicao">
							<option value={">"}>Maior que</option>
							<option value={"<"}>Menor que</option>
							<option value={"="}>Igual</option>
							<option value={">="}>Maior igual que</option>
							<option value={"<="}>Menor igual que</option>
						</select>
                    </div>
                    
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="valor">Valor</label>
                        <input type="text" className='form-input' id="valor" />
                    </div>
                    
                    <div className="col-span-6">
                        <label className='alt-light-color-text mb-2' htmlFor="parametro">Parâmetro</label>
						<select className="form-input col-span-2" id="parametro">
                            <option value="">Selecione um parâmetro</option>
                            {parametros.map(param => (
                                <option key={param.id_tipo_parametro} value={param.id_tipo_parametro}>
                                    {param.nome} ({param.unidade})
                                </option>
                            ))}
						</select>
                    </div>
                    
                    <div className='col-span-6'>
                        <label className='alt-light-color-text mb-2' htmlFor="mensagem">Mensagem</label>
                        <textarea className='form-input' id="mensagem" rows={10} />
                    </div>
                </div>

                <button className='submit-button mt-8'>
                    Enviar
                </button>
            </form>
        </Card>
    )
}

export default AlertForm
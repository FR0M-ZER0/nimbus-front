import { useState, useEffect } from "react"
import Card from "./Card"
import api from "../api/api"
import { DownloadSimpleIcon } from "@phosphor-icons/react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

function AlarmReportTable() {
    const [stations, setStations] = useState([])
    const [selectedStation, setSelectedStation] = useState("")

    const [range, setRange] = useState({ from: undefined, to: undefined })
    const [openCalendar, setOpenCalendar] = useState(false)

    const fetchStations = async () => {
        try {
            const response = await api.get("/stations")
            setStations(response.data.data)
        } catch (err) {
            console.error("Erro ao buscar estações", err)
        }
    }

    const handleDownload = async () => {
        if (!selectedStation || !range.from || !range.to) {
            alert("Selecione estação e período!")
            return
        }

        const startDate = range.from.toISOString()
        const endDate = range.to.toISOString()

        const query = new URLSearchParams({
            id_estacao: selectedStation,
            startDate,
            endDate,
        }).toString()

        try {
            const res = await api.get(`/reports/alarms?${query}`, {
                responseType: "blob",
            })

            const blob = new Blob([res.data], { type: "application/pdf" })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = "relatorio-alarmes.pdf"
            link.click()
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.error("Erro ao baixar relatório", err)
        }
    }

    useEffect(() => {
        fetchStations()
    }, [])

    return (
        <Card title="Gerar relatório de alarmes">
            <div className="grid grid-cols-6 gap-x-4">
                <div className="col-span-3">
                    <label className="alt-light-color-text mb-2" htmlFor="station">
                        Estação
                    </label>
                    <select
                        id="station"
                        className="form-input"
                        value={selectedStation}
                        onChange={(e) => setSelectedStation(e.target.value)}
                    >
                        <option value="">Escolha uma opção</option>
                        {stations.map((s) => (
                            <option key={s.id_estacao} value={s.id_estacao}>
                                {s.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-span-3">
                    <label className="alt-light-color-text mb-2">Período</label>
                    <div
                        className="form-input cursor-pointer"
                        onClick={() => setOpenCalendar(!openCalendar)}
                    >
                        {range.from && range.to
                            ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                            : "Selecionar período"}
                    </div>

                    {openCalendar && (
                        <div className="p-2 bg-white rounded-lg shadow-lg absolute z-50 mt-2">
                            <DayPicker
                                mode="range"
                                selected={range}
                                onSelect={(v) => setRange(v || { from: undefined, to: undefined })}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-center items-center h-[300px] space-y-2">
                <DownloadSimpleIcon
                    size={120}
                    className="alt-light-color-text cursor-pointer"
                    onClick={handleDownload}
                />
                <p
                    className="text-xl green-color-text cursor-pointer"
                    onClick={handleDownload}
                >
                    Baixar
                </p>
            </div>
        </Card>
    )
}

export default AlarmReportTable

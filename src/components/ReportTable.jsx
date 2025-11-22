import Card from "./Card"
import { DownloadSimpleIcon } from "@phosphor-icons/react"

function ReportTable() {
    return (
        <Card title='Gerar relatórios'>
            <div className="grid grid-cols-7 gap-x-4">
                <div className="col-span-2">
                    <label className='alt-light-color-text mb-2' htmlFor="">Estação</label>
                    <select
                        id="station"
                        className='form-input'
                    >
                        <option className='alt-dark-color-3-bg'>Escolha uma opção</option>
                    </select>
                </div>

                <div className="col-span-3">
                    <label className='alt-light-color-text mb-2' htmlFor="">Parâmetro</label>
                    <select
                        id="param"
                        className='form-input'
                    >
                        <option className='alt-dark-color-3-bg'>Escolha uma opção</option>
                    </select>
                </div>

                <div className='col-span-2'>
                    <label className='alt-light-color-text mb-2' htmlFor="">Período</label>
                    <input type="number" step={"any"}  min="-90" max="90" className='form-input' style={{padding: 12}} />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center h-[300px] space-y-2">
                <DownloadSimpleIcon size={120} className="alt-light-color-text cursor-pointer" />
                <p className="text-xl green-color-text cursor-pointer">Baixar</p>
            </div>
        </Card>
    )
}

export default ReportTable
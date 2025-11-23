import Card from "./Card"
import StationImage from "../assets/station_image.svg"

function StationsCreatedTable({ stations }) {
    return (
        <Card title={'Estações criadas por você'}>
            <table className="min-w-full border-collapse">
                <tbody>
                    {stations.map(station => (
                        <tr key={station.uid}>
                            <td className="p-2">
                                <img src={StationImage} />
                            </td>
                            <td className="p-2">
                                <p className="alt-light-color-text">UID</p>
                                <p>{station.id_estacao}</p>
                            </td>
                            <td className="p-2">
                                <p className="alt-light-color-text">Nome</p>
                                <p>{station.nome}</p>
                            </td>
                            <td className="p-2">
                                <p className="alt-light-color-text">Descrição</p>
                                <p>{station.descricao}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    )
}

export default StationsCreatedTable

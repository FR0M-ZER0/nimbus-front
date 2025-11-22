import Card from "./Card"

function StationsCreatedTable({ stations }) {
    return (
        <Card title={'Estações criadas por você'}>
            <table className="min-w-full border-collapse">
                <tbody>
                    {stations.map(station => (
                        <tr key={station.uid}>
                            <td className="p-2">
                                <img src={station.image} />
                            </td>
                            <td className="p-2">
                                <p className="alt-light-color-text">UID</p>
                                <p>{station.uid}</p>
                            </td>
                            <td className="p-2">
                                <p className="alt-light-color-text">Nome</p>
                                <p>{station.name}</p>
                            </td>
                            <td className="p-2">
                                <p className="alt-light-color-text">Params</p>
                                <p>{station.params}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    )
}

export default StationsCreatedTable

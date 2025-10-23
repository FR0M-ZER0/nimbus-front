import Table from './Table'

function AlertsTable({ alerts, onLoading }) {
    if (!alerts || alerts.length === 0) {
        return <p className="text-gray-500">Nenhum alerta encontrado.</p>
    }

    return (
        <Table 
            title={'Alarmes emitidos'} 
            tableHeadEntries={Object.keys(alerts[0])} 
            tableBodyEntries={alerts}
            onLoading={onLoading}
        />
    )
}

export default AlertsTable

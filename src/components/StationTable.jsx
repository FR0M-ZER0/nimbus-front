import HeadlessTable from './HeadlessTable'

function StationTable({ stations, onActionBtnClick, onLoading, filters, onSearchChange, onSortChange, onFilterChange }) {
    return (
        <HeadlessTable 
            title={'Estações'} 
            tableEntries={stations} 
            onActionBtnClick={onActionBtnClick}
            onLoading={onLoading}
            filters={filters}
            onSearchChange={onSearchChange}
            onSortChange={onSortChange}
            onFilterChange={onFilterChange}
        />
    )
}

export default StationTable
import React from 'react'
import HeadlessTable from './HeadlessTable'

function StationTable({ stations, onActionBtnClick, onLoading }) {
    return (
        <HeadlessTable 
            title={'Estações'} 
            tableEntries={stations} 
            onActionBtnClick={onActionBtnClick}
            onLoading={onLoading}
        />
    )
}

export default StationTable

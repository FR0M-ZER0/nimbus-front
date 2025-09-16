import React from 'react'
import HeadlessTable from './HeadlessTable'

function StationTable({ stations, onActionBtnClick }) {
    return (
        <HeadlessTable title={'Estações'} tableEntries={stations} onActionBtnClick={onActionBtnClick} />
    )
}

export default StationTable

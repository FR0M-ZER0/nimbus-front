import React from 'react'
import HeadlessTable from './HeadlessTable'

function StationTable({ stations }) {
    return (
        <HeadlessTable title={'Estações'} tableEntries={stations} />
    )
}

export default StationTable

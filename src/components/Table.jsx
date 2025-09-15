import React from 'react'
import InfoCard from './InfoCard'

function Table({ title, tableHeadEntries, tableBodyEntries }) {
	return (
		<InfoCard>
            <div className='flex flex-col'>
				<div className='flex items-center mb-8'>
					<p className='text-3xl'>
						{ title }
					</p>

					<div className='grid grid-cols-8 gap-x-6 w-full ml-4'>
						<input type="text" placeholder='Digite o nome' className="form-input col-span-2" />
						<select className="form-input col-span-2">
							<option disabled value='' selected>
								Ordenar por
							</option>
						</select>
						<select className="form-input col-span-2">
							<option disabled value='' selected>
								Filtrar por
							</option>
						</select>
					</div>
				</div>

				<table>
					<thead>
						{
							tableHeadEntries.map((entry, index) => (
								<th key={index}>{entry}</th>
							))
						}
					</thead>

					<tbody>
						<tr>
							{
								tableBodyEntries.map((entry, index) => (
									<td key={index}>{entry}</td>
								))
							}
						</tr>
					</tbody>
				</table>
            </div>
        </InfoCard>
	)
}

export default Table

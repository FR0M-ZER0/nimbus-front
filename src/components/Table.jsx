import React from 'react'
import InfoCard from './InfoCard'
import Paginator from './Paginator'
import { usePagination } from '../hooks/usePagination'
import { motion, AnimatePresence } from 'framer-motion'

function Table({ title, tableHeadEntries, tableBodyEntries }) {
	// TODO: mudar o número de items por página quando houver os dados vindos do back
    const { currentItems, pageCount, handlePageClick, rowAnimation } = usePagination(tableBodyEntries, 3)

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

				<table className='w-full'>
					<thead>
						{
							tableHeadEntries.map((entry, index) => (
								<th key={index} className='text-left alt-light-color-text pb-2 border-b-1 border-[#9093B4]'>{entry}</th>
							))
						}
						<th className='text-left alt-light-color-text pb-2 border-b-1 border-[#9093B4]'>Ações</th>
					</thead>

					<tbody>
						<AnimatePresence>
							{
								currentItems.map((row) => (
									<motion.tr
										key={row.id || JSON.stringify(row)}
										variants={rowAnimation}
										initial="hidden"
										animate="visible"
										exit="exit"
										transition={{ duration: 0.3 }}
									>
										{
											tableHeadEntries.map((col, colIndex) => (
												<td key={colIndex} className='pt-10 pb-4 border-b-1 border-[#9093B4]'>{row[col]}</td>
											))
										}
										<td className='pt-10 pb-4 border-b-1 border-[#9093B4] '>
											<span className='cursor-pointer hover:text-[#0000FF] transition-all duration-300'>Ver mais</span>
										</td>
									</motion.tr>
								))
							}
						</AnimatePresence>
					</tbody>
				</table>
				<Paginator pageCount={pageCount} onButtonClick={handlePageClick} />
            </div>
        </InfoCard>
	)
}

export default Table

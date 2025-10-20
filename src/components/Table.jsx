import React from 'react'
import InfoCard from './InfoCard'
import Paginator from './Paginator'
import Filter from './Filter'
import loadingAnimation from '../assets/loading.gif'
import { usePagination } from '../hooks/usePagination'
import { motion, AnimatePresence } from 'framer-motion'

function Table({ title, tableHeadEntries, tableBodyEntries, onLoading }) {
    const { currentItems, pageCount, handlePageClick, rowAnimation } = usePagination(tableBodyEntries, 10)

	return (
		<InfoCard>
            <div className='flex flex-col'>
				<div className='flex items-center mb-8'>
					<p className='text-3xl'>
						{ title }
					</p>

					<div className='ml-4'>
						<Filter />
					</div>
				</div>

				{onLoading ? (
					<div className='w-full flex justify-center'>
						<img src={loadingAnimation} alt="loading" width={160} />
					</div>
				) : tableBodyEntries.length === 0 ? (
					<p className='text-center alt-light-color-text'>Não há dados disponíveis</p>
				) : (
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
				)}

				<Paginator pageCount={pageCount} onButtonClick={handlePageClick} />
            </div>
        </InfoCard>
	)
}

export default Table

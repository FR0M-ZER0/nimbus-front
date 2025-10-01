import React from 'react'
import InfoCard from './InfoCard'
import Paginator from './Paginator'
import Filter from './Filter'
import { usePagination } from '../hooks/usePagination'
import loadingAnimation from '../assets/loading.gif'
import { motion, AnimatePresence } from 'framer-motion'

function HeadlessTable({ title, tableEntries, onActionBtnClick, onLoading }) {
    const { currentItems, pageCount, handlePageClick, rowAnimation } = usePagination(tableEntries, 10)

    return (
		<InfoCard>
            <div className='flex flex-col'>
				<div className='flex items-center mb-8'>
					<p className='text-3xl'>
						{ title }
					</p>

                    <Filter />
				</div>

                {onLoading ? (
                    <div className='w-full flex justify-center'>
                        <img src={loadingAnimation} alt="loading" width={160} />
                    </div>
                ) : tableEntries.length === 0 ? (
                    <div className='py-4 flex justify-center w-full'>
                        <p className='text-center alt-light-color-text'>Não há dados disponíveis</p>
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                {
                                    currentItems.map((_, index) => (
                                        <th key={index}></th>
                                    ))
                                }
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <AnimatePresence mode="wait">
                                {currentItems.map((entry, index) => (
                                    <motion.tr
                                        key={entry.uid || index}
                                        variants={rowAnimation}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className='border-b-1 border-[#9093B4]'
                                    >
                                        {Object.entries(entry)
                                            .filter(([key]) => key !== 'status')
                                            .map(([key, value]) => (
                                                <td key={key} className='pb-3 pt-6'>
                                                    {key !== 'image' ? (
                                                        <>
                                                            <p className='alt-light-color-text flex items-center gap-2'>
                                                                {key}
                                                                {key === 'uid' && (
                                                                    entry.status === 'online' ? (
                                                                        <span className='w-3 h-3 inline-block rounded-full green-color-bg'></span>
                                                                    ) : (
                                                                        <span className='w-3 h-3 inline-block rounded-full red-color-bg'></span>
                                                                    )
                                                                )}
                                                            </p>
                                                            <p className='text-[18px]'>{value}</p>
                                                        </>
                                                    ) : (
                                                        <img src={value} alt='station image' />
                                                    )}
                                                </td>
                                            ))}
                                        <td className='pb-3 pt-6'>
                                            <p className='alt-light-color-text'>Ações</p>
                                            <p
                                                className='text-[18px] cursor-pointer hover:text-[#0000FF] transition-all duration-300'
                                                onClick={() => onActionBtnClick(entry)}
                                            >
                                                Ver mais
                                            </p>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                )}
                
                <Paginator pageCount={pageCount} onButtonClick={handlePageClick} />
            </div>
        </InfoCard>
    )
}

export default HeadlessTable
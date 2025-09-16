import React from 'react'
import InfoCard from './InfoCard'
import Paginator from './Paginator'
import { usePagination } from '../hooks/usePagination'

function HeadlessTable({ title, tableEntries, onActionBtnClick }) {
    // TODO: mudar o número de items por página quando houver os dados vindos do back
    const { currentItems, pageCount, handlePageClick } = usePagination(tableEntries, 3)

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
                        {
                            currentItems.map((entry, index) => (
                                <tr key={index} className='border-b-1 border-[#9093B4]'>
                                    {
                                        Object.entries(entry)
                                        .filter(([key]) => key !== 'status')
                                        .map(([key, value]) => ( 
                                            <td className='pb-3 pt-6'>
                                                {
                                                    key !== 'image' ? (
                                                        <>
                                                            <p className='alt-light-color-text flex items-center gap-2'>
                                                                { key }
                                                                {
                                                                    key === 'uid' && (
                                                                        entry.status === 'online' ? (
                                                                            <span className='w-3 h-3 inline-block rounded-full green-color-bg'></span>
                                                                        ) : (
                                                                            <span className='w-3 h-3 inline-block rounded-full red-color-bg'></span>
                                                                        )
                                                                    )
                                                                }
                                                            </p>
                                                            <p className='text-[18px]'>{ value }</p>
                                                        </>
                                                    ) : (
                                                        <img src={value} alt='station image' />
                                                    )
                                                }
                                            </td>
                                        ))
                                    }
                                    <td className='pb-3 pt-6'>
                                        <p className='alt-light-color-text'>Ações</p>
                                        <p className='text-[18px] cursor-pointer hover:text-[#0000FF] transition-all duration-300' onClick={onActionBtnClick}>Ver mais</p>
                                    </td>
                                </tr>
                            ))
                        }
					</tbody>
				</table>
                <Paginator pageCount={pageCount} onButtonClick={handlePageClick} />
            </div>
        </InfoCard>
    )
}

export default HeadlessTable
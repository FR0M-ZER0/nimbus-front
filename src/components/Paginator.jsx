import ReactPaginate from 'react-paginate'
import { CaretRightIcon, CaretLeftIcon } from '@phosphor-icons/react'

function Paginator({ onButtonClick, pageCount }) {
    return (
        <ReactPaginate
            containerClassName='flex space-x-4 mt-8'
            breakLabel='...'
            nextLabel={<CaretRightIcon size={28} className='cursor-pointer' />}
            previousLabel={<CaretLeftIcon size={28} className='cursor-pointer' />}
            previousClassName='h-10 w-10 p-1 alt-dark-color-3-bg rounded-lg flex justify-center items-center'
            nextClassName='h-10 w-10 p-1 alt-dark-color-3-bg rounded-lg flex justify-center items-center'
            pageClassName='h-10 w-10 rounded-lg alt-dark-color-3-bg'
            pageLinkClassName='w-full h-full flex justify-center items-center cursor-pointer font-semibold text-lg'
            activeClassName='h-11 w-11 blue-color-bg'
            disabledClassName='hidden'
            onPageChange={onButtonClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
        />
    )
}

export default Paginator

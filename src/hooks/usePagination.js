import { useState, useMemo } from 'react'

/* Hook para retornar o array com os itens atuais da página (currentItems),
* número de paǵinas (pageCount) e a função para tratar a mudança de página
*/
export function usePagination(data = [], itemsPerPage = 10) { // Data é o array com os itens que queremos paginar
	const [itemOffset, setItemOffset] = useState(0)

	const endOffset = itemOffset + itemsPerPage

	const currentItems = useMemo(
		() => data.slice(itemOffset, endOffset),
		[data, itemOffset, endOffset]
	)

	const pageCount = Math.ceil(data.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length
		setItemOffset(newOffset)
	}

	const rowAnimation = {
        hidden: { opacity: 0, y: 5, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 1200,
                damping: 40
            }
        },
    }

	return {
		currentItems,
		pageCount,
		handlePageClick,
		rowAnimation
	}
}

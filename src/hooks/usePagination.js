import { useState, useMemo } from 'react'

export function usePagination(data = [], itemsPerPage = 10) {
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

	return {
		currentItems,
		pageCount,
		handlePageClick,
	}
}

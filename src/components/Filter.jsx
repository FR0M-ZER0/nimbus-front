function Filter({ 
  searchPlaceholder = 'Digite o nome', 
  sortOptions = [], 
  filterOptions = [], 
  onSearchChange, 
  onSortChange, 
  onFilterChange,
  currentSearch = '',
  currentSortBy = '',
  currentSortOrder = 'desc',
  currentFilter = ''
}) {
  return (
    <div className='grid grid-cols-8 gap-x-6 w-full'>
      <input 
        type="text" 
        placeholder={searchPlaceholder} 
        className="form-input col-span-2" 
        value={currentSearch}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select 
        className="form-input col-span-2"
        value={`${currentSortBy}|${currentSortOrder}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split('|');
          onSortChange(sortBy, sortOrder);
        }}
      >
        <option disabled value=''>
          Ordenar por
        </option>
        {sortOptions.map(option => (
          <option 
            key={option.value} 
            value={`${option.value}|${option.defaultOrder || 'desc'}`}
          >
            {option.label}
          </option>
        ))}
      </select>
      <select 
        className="form-input col-span-2"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option disabled value=''>
          Filtrar por
        </option>
        {filterOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Filter;
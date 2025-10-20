import React from 'react'

function Filter() {
    return (
        <div className='grid grid-cols-8 gap-x-6 w-full'>
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
    )
}

export default Filter
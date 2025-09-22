import React from 'react'
import Modal from './Modal'

function ParamModal({ closeModal }) {
    return (
        <Modal onClose={closeModal} needsButton={true}>
            <div>
                <h2 className='text-2xl alt-light-color-text mb-12'>
                    Parâmetro
                </h2>

                <div className='grid grid-cols-7 flex-1 gap-x-10 gap-y-12'>
                        <div className='col-span-3'>
                            <label htmlFor="" className='mb-2'>Nome</label>
                            <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' />
                        </div>
                        <div className='col-span-1'>
                            <label htmlFor="" className='mb-2'>Fator</label>
                            <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' />
                        </div>
                        <div className='col-span-1'>
                            <label htmlFor="" className='mb-2'>Offset</label>
                            <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' />
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="" className='mb-2'>Polinômio</label>
                            <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' />
                        </div>
                        <div className='col-span-4'>
                            <label htmlFor="" className='mb-2'>Json</label>
                            <textarea name="" id="" className='main-dark-color-bg w-full rounded-lg' rows={20}>

                            </textarea>
                        </div>
                        <div className='col-span-3'>
                            <label htmlFor="" className='mb-2'>Offset</label>
                            <select className='py-2 border-b-1 border-[#D9D9D9] w-full px-1'>
                                <option value="" selected className='py-1'>SP</option>
                            </select>
                        </div>
                    </div>
                </div>
        </Modal>
    )
}

export default ParamModal

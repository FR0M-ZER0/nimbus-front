import React from 'react'
import TabModal from './TabModal'
import StationImage from '../assets/station_image.svg'
import { TrashIcon, PencilSimpleIcon, CheckIcon } from '@phosphor-icons/react'

function StationModal({ closeModal }) {
    return (
        <TabModal
            tabName={'Estações'}
            onClose={closeModal} 
            tabContent={
                <>
                    <div className='flex'>
                        <div className='mr-4'>
                            <img src={StationImage} alt="" width={120} />
                            <div className='flex justify-center space-x-6'>
                                <PencilSimpleIcon size={20} className='cursor-pointer' />
                                <TrashIcon size={20} className='cursor-pointer' />
                            </div>
                        </div>
                        <div className='grid grid-cols-7 flex-1 gap-x-10'>
                            <div className='col-span-3'>
                                <label htmlFor="" className='mb-2'>UID</label>
                                <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' />
                            </div>
                            <div className='col-span-4'>
                                <label htmlFor="" className='mb-2'>Nome</label>
                                <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' />
                            </div>
                            <div className='col-span-1'>
                                <label htmlFor="" className='mb-2'>Estado</label>
                                <select className='py-2 border-b-1 border-[#D9D9D9] w-full px-1'>
                                    <option value="" selected className='py-1'>SP</option>
                                </select>
                            </div>
                            <div className='col-span-3'>
                                <label htmlFor="" className='mb-2'>Cidade</label>
                                <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' />
                            </div>
                            <div className='col-span-3'>
                                <label htmlFor="" className='mb-2'>Bairro</label>
                                <input type="text" className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' />
                            </div>
                        </div>
                    </div>
                    <div className='mt-12 ml-[136px]'>
                        <h2 className='text-2xl alt-light-color-text mb-8'>Parâmetros</h2>
                        <div className='grid grid-cols-7 gap-y-10'>
                            <div className='col-span-1 flex items-center'>
                                {/* TODO: Trocar este conteúdo mockado */}
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                            <div className='col-span-1 flex items-center'>
                                <input
                                    id='param-1'
                                    type='checkbox'
                                    name='param'
                                    value='abc123'
                                    className='peer hidden'
                                />
                                {/* TODO: Controlar o valor do input por controle de estado via hook */}
                                <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                                </div>
                                <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                                <label
                                    htmlFor='param-1'
                                    className='cursor-pointer px-3 py-1'
                                >
                                    abc123
                                </label>
                            </div>
                        </div>
                    </div>                            
                </>
            }
        />
    )
}

export default StationModal

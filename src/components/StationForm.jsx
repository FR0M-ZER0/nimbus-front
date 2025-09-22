import { React, useState } from 'react'
import Card from './Card'
import ParamModal from './ParamModal'
import { PlusIcon, CheckIcon } from '@phosphor-icons/react'

// TODO: Adicionar zod + react hook form
function StationForm() {
    const params = ['Umidade', 'Pluvimétrico 0.25', 'Pluviométrico 0.5', 'Vento', 'xyz', 'etc']

    const [modalIsOpen, setModalisOpen] = useState(false)
    
    const openModal = () => {
        setModalisOpen(true)
    }

    const closeModal = () => {
        setModalisOpen(false)
    }

    return (
        <Card title={'Cadastrar estação'}>
            <form className='w-full'>
                <div className='grid grid-cols-6 gap-x-4 gap-y-8'>
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">UUID da estação</label>
                        <input type="text" className='form-input' />
                    </div>

                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Nome</label>
                        <input type="text" className='form-input' />
                    </div>
                    
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Latitude</label>
                        <input type="text" className='form-input' />
                    </div>
                    
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Longitude</label>
                        <input type="text" className='form-input' />
                    </div>
                    
                    <div className="col-span-2">
                        <label className='alt-light-color-text mb-2' htmlFor="">Estado</label>
                        <input type="text" className='form-input' />
                    </div>
                    
                    <div className="col-span-4">
                        <label className='alt-light-color-text mb-2' htmlFor="">Cidade</label>
                        <input type="text" className='form-input' />
                    </div>
                    
                    <div className='col-span-6'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Bairro</label>
                        <input type="text" className='form-input' />
                    </div>
                </div>

                <div className='mt-12 flex items-center justify-between'>
                    <h2 className='text-3xl'>Parâmetros</h2>
                    <PlusIcon size={24} className='green-color-text cursor-pointer' onClick={openModal} />
                </div>
                            
                <div className='grid grid-cols-4 mt-4'>
                    {params.map((param, index) => (
                        <div key={index} className='col-span-1 flex items-center'>
                            <input
                                id={`param-${index}`}
                                type='checkbox'
                                name='param'
                                value={param}
                                className='peer hidden'
                            />
                            {/* TODO: Controlar o valor do input por controle de estado via hook */}
                            <div className='min-h-6 min-w-6 max-h-6 max-w-6 bg-[#262730] rounded-md peer-checked:bg-[#292988] transition relative'>
                            </div>
                            <CheckIcon size={18} className='hidden peer-checked:block text-white absolute' />
                            <label
                                htmlFor={`param-${index}`}
                                className='cursor-pointer px-3 py-1'
                            >
                                {param}
                            </label>
                        </div>
                    ))}
                </div>

                <button className='submit-button mt-8'>
                    Enviar
                </button>
            </form>

            {
                modalIsOpen &&
                <ParamModal closeModal={closeModal} />
            }
        </Card>
    )
}

export default StationForm

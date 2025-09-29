import React from 'react'
import Card from './Card'

function AlertForm() {
    return (
        <Card title={'Cadastrar alerta'}>
            <form className='w-full'>
                <div className='grid grid-cols-6 gap-x-4 gap-y-8'>
                    <div className='col-span-2'>
                        <label className='alt-light-color-text mb-2' htmlFor="">UUID da estação</label>
                        <input type="text" className='form-input' />
                    </div>

                    <div className='col-span-4'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Nome</label>
                        <input type="text" className='form-input' />
                    </div>
                    
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Condição</label>
                        <input type="text" className='form-input' />
                    </div>
                    
                    <div className='col-span-3'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Valor</label>
                        <input type="text" className='form-input' />
                    </div>
                    
                    <div className="col-span-6">
                        <label className='alt-light-color-text mb-2' htmlFor="">Mensagem</label>
						<select className="form-input col-span-2">
							<option disabled value='' selected>
								Pluviométrico
							</option>
						</select>
                    </div>
                    
                    <div className='col-span-6'>
                        <label className='alt-light-color-text mb-2' htmlFor="">Mensagem</label>
                        <textarea className='form-input' rows={10} />
                    </div>
                </div>

                <button className='submit-button mt-8'>
                    Enviar
                </button>
            </form>
        </Card>
    )
}

export default AlertForm
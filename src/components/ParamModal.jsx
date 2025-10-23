import Modal from './Modal'
import api from '../api/api'
import { toast } from 'react-toastify'
import { useState } from 'react';

function ParamModal({ closeModal, editingParam, onUpdate }) {
    const [name, setName] = useState(editingParam?.nome || '')
    const [unit, setUnit] = useState(editingParam?.unidade || '')
    const [fator, setFator] = useState(editingParam?.fator || '')
    const [offset, setOffset] = useState(editingParam?.offset || '')
    const [polinomio, setPolinomio] = useState(editingParam?.polinomio || '')
    const [jsonText, setJsonText] = useState(editingParam?.json ? JSON.stringify(editingParam.json, null, 2) : '')

    const handleSubmit = async () => {
        let parsedJson
        try {
            parsedJson = JSON.parse(jsonText)
        } catch (err) {
            toast.error('JSON inválido')
            return
        }

        const payload = {
            nome: name,
            unidade: unit,
            fator: parseFloat(fator),
            offset: parseFloat(offset),
            polinomio,
            json: parsedJson
        }

        try {
            let response
            if (editingParam) {
                response = await api.put(`/typeParameters/${editingParam.id_tipo_parametro}`, payload)
                toast.success('Parâmetro atualizado com sucesso!')
            } else {
                response = await api.post('/typeParameters', payload)
                toast.success('Parâmetro criado com sucesso!')
            }

            onUpdate()
            console.log('Tipo parâmetro criado: ', response.data)
            closeModal()
        } catch (err) {
            console.error('Erro ao criar tipo parâmetro: ', err)
            toast.error('Erro ao criar parâmetro')
        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir este parâmetro?')
        if (!confirmDelete) return

        try {
            await api.delete(`/typeParameters/${editingParam.id_tipo_parametro}`)
            toast.info('Parâmetro excluído com sucesso')
            onUpdate()
            closeModal()
        } catch (err) {
            console.error('Erro ao excluir parâmetro: ', err)
            toast.error('Não foi possível excluir o parâmetro')
        }
    }

    return (
        <Modal onClose={closeModal} needsButton={true} onSave={handleSubmit} deleteBtn={editingParam ? true : false} onDelete={handleDelete}>
            <div onSubmit={handleSubmit}>
                <h2 className='text-2xl alt-light-color-text mb-12'>
                    Parâmetro
                </h2>

                <div className='grid grid-cols-7 flex-1 gap-x-10 gap-y-12'>
                        <div className='col-span-3'>
                            <label htmlFor="" className='mb-2'>Nome</label>
                            <input 
                                type="text" 
                                className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />                        
                        </div>
                        <div className='col-span-1'>
                            <label htmlFor="" className='mb-2'>Fator</label>
                            <input 
                                type="number" 
                                className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' 
                                value={fator} 
                                onChange={(e) => setFator(e.target.value)} 
                            />                        
                        </div>
                        <div className='col-span-1'>
                            <label htmlFor="" className='mb-2'>Offset</label>
                            <input 
                                type="number" 
                                className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' 
                                value={offset} 
                                onChange={(e) => setOffset(e.target.value)} 
                            />
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="" className='mb-2'>Polinômio</label>
                            <input 
                                type="text" 
                                className='py-2 border-b-1 border-[#D9D9D9] w-full px-1' 
                                value={polinomio}
                                onChange={(e) => setPolinomio(e.target.value)}
                            />
                        </div>
                        <div className='col-span-4'>
                            <label htmlFor="" className='mb-2'>Json</label>
                            <textarea
                                className='main-dark-color-bg w-full rounded-lg font-mono text-sm p-2'
                                rows={20}
                                value={jsonText}
                                onChange={(e) => setJsonText(e.target.value)}
                            />
                        </div>
                        <div className='col-span-3'>
                            <label htmlFor="" className='mb-2'>Unidade</label>
                            <select 
                                className='py-2 border-b-1 border-[#D9D9D9] w-full px-1'
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="L">Litros</option>
                                <option value="m³">Metros cúbicos</option>
                                <option value="°C">Graus Celsius</option>
                                <option value="K">Kelvin</option>
                                <option value="Pa">Pascal</option>
                                <option value="bar">Bar</option>
                                <option value="m/s">Metros por segundo</option>
                                <option value="km/h">Km/h</option>
                                <option value="V">Volts</option>
                                <option value="A">Ampère</option>
                                <option value="W">Watt</option>
                                <option value="%">Percentual</option>
                            </select>
                        </div>
                    </div>
                </div>
        </Modal>
    )
}

export default ParamModal

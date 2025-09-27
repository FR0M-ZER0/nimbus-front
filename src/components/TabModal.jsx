import React, { useState } from 'react'
import Modal from './Modal'

function TabModal({ onClose, tabName, dataTabContent, tabContent, onSave, onDelete }) {
    const [activeTab, setActiveTab] = useState(tabName)

    return (
        <Modal onClose={onClose}>
            <div className='flex'>
                <div
                    className={`min-w-[198px] py-2 border-4 border-[#262730] border-b-0 cursor-pointer text-center ${
                        activeTab === tabName ? 'main-dark-color-bg' : ''
                    }`}
                    onClick={() => setActiveTab(tabName)}
                >
                    {tabName}
                </div>
                <div
                    className={`min-w-[198px] py-2 border-4 border-[#262730] border-b-0 border-l-0 cursor-pointer text-center ${
                        activeTab === 'Dados' ? 'main-dark-color-bg' : ''
                    }`}
                    onClick={() => setActiveTab('Dados')}
                >
                    Dados
                </div>
            </div>

            <div className='flex flex-col h-full border-4 border-[#262730] w-full p-8 min-h-[600px]'>
                {activeTab === tabName && (
                    tabContent
                )}
                {activeTab === 'Dados' && (
                    dataTabContent
                )}

                <div className='flex w-full justify-between items-center mt-auto'>
                    <p className='text-red-400 cursor-pointer' onClick={onDelete}>
                        Excluir
                    </p>
                    <div className='space-x-4'>
                        <button className='cancel-button' onClick={onClose}>
                            Cancelar 
                        </button>
                        <button className='submit-button' onClick={onSave}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default TabModal

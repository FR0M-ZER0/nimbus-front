import React, { useState } from 'react'
import Modal from './Modal'

function TabModal({ onClose, tabName, dataTabContent, tabContent }) {
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

            <div className='border-4 border-[#262730] w-full h-full p-4'>
                {activeTab === tabName && (
                    tabContent
                )}
                {activeTab === 'Dados' && (
                    dataTabContent
                )}
            </div>
        </Modal>
    )
}

export default TabModal

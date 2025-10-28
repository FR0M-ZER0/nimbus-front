import { XIcon } from '@phosphor-icons/react'
import { AnimatePresence } from 'framer-motion'


function Modal({ onClose, children, needsButton=false, onSave, deleteBtn=false, onDelete }) {
    // Animação do fundo escuro
    const backdropAnimation = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    }

    // Animação do modal
    const modalAnimation = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: { 
            opacity: 0, 
            scale: 0.95,
            transition: { duration: 0.2, ease: "easeIn" }
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center"
                onClick={onClose}
                variants={backdropAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.div
                    className="relative alt-dark-color-bg w-[1200px] max-w-[90%] p-12 rounded-lg max-h-[1000px]"
                    onClick={e => e.stopPropagation()}
                    variants={modalAnimation}
                >
                    <XIcon 
                        size={28} 
                        className="absolute right-6 top-6 cursor-pointer" 
                        onClick={onClose} 
                    />
                    {children}

                    {
                        needsButton &&
                        <div className={`flex w-full ${deleteBtn ? 'justify-between' : 'justify-end'} items-center mt-auto`}>
                            {
                                deleteBtn &&
                                <p className='text-red-400 cursor-pointer' onClick={onDelete}>
                                    Excluir
                                </p>
                            }
                            <div className='space-x-4'>
                                <button className='cancel-button' onClick={onClose}>
                                    Cancelar 
                                </button>
                                <button className='submit-button' onClick={onSave}>
                                    Salvar
                                </button>
                            </div>
                        </div>
                    }
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Modal

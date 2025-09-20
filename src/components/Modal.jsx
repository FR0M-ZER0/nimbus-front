import React from 'react'
import { XIcon } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

function Modal({ onClose, children }) {
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
                    className="relative alt-dark-color-bg w-[1200px] max-w-[90%] p-12 rounded-lg"
                    onClick={e => e.stopPropagation()}
                    variants={modalAnimation}
                >
                    <XIcon 
                        size={28} 
                        className="absolute right-6 top-6 cursor-pointer" 
                        onClick={onClose} 
                    />
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Modal

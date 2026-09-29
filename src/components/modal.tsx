import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { createPortal } from 'react-dom'

const Backdrop: React.FC<
  React.PropsWithChildren<{
    onClick: () => void
  }>
> = ({ children, onClick }) => {
  return createPortal(
    <motion.div
      onClick={onClick}
      className="fixed z-[1000] inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-[1px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>,
    document.body
  )
}

const dropIn = {
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 40,
      stiffness: 500
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8
  }
}

export const Modal: React.FC<
  React.PropsWithChildren<{
    handleClose: () => void
    className?: string
  }>
> = ({ handleClose, children, className }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [handleClose])

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className={`bg-[#222222] rounded-2xl p-4 relative ${className ?? ''}`}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          onClick={handleClose}
          className="absolute text-gray-100 right-4 top-4"
        >
          <X weight="bold" size={24} />
        </button>
        {children}
      </motion.div>
    </Backdrop>
  )
}

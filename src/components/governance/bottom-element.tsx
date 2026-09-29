'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const BottomElement = () => {
  return (
    <motion.svg
      viewBox="0 0 480 163"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%'
      }}
      initial={{
        opacity: 0.5,
        y: '100%'
      }}
      animate={{
        opacity: 1,
        y: '0%'
      }}
      transition={{
        duration: 0.4,
        ease: 'circOut'
      }}
    >
      <circle cx="-59" cy="325" r="324.5" stroke="#CDA20B" />
      <circle cx="240" cy="239" r="238.5" fill="#BFFFC6" stroke="#CDA20B" />
      <circle cx="539" cy="325" r="324.5" fill="#FBF9DA" stroke="#CDA20B" />
    </motion.svg>
  )
}

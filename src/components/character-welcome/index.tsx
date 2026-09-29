'use client'

import { motion } from 'framer-motion'

export function CharacterWelcome() {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center h-full w-full rounded-[2.75rem]"
      style={{
        background: 'url(/bg-final.svg), #D4F5D9',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.h1
        className="font-sans text-[3.375rem] font-bold tracking-[-0.1rem] text-[#383737] text-center"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.15,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        we made
        <br />
        something
      </motion.h1>
      <motion.h2
        className="font-script font-normal text-[#21BB36] text-center text-[8.25rem] tracking-[-0.41rem] !leading-[104px] mt-6"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.6,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        special for
        <br />
        you!
      </motion.h2>
      <motion.p
        className="text-[#383737] text-center font-sans font-bold text-[1.5rem] mt-12"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{
          delay: 1.2,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {'leap' in window ? "let's check it out!" : 'but, before we show it...'}
      </motion.p>
    </motion.div>
  )
}

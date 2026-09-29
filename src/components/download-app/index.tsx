'use client'

import { motion } from 'framer-motion'

export function DownloadApp() {
  return (
    <motion.div
      style={{
        background: 'url(/bg-final.svg), #D4F5D9',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className="relative flex flex-col items-center justify-center h-full w-full rounded-[2.75rem] bg-[#D4F5D9] sm:px-4 px-6"
    >
      <motion.h1
        className="font-sans text-[1.8rem] font-bold tracking-[-0.1rem] text-[#383737] text-center"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.15,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        here&apos;s how you can make
        <br />
        2024 even better!
      </motion.h1>
      <motion.h2
        className="font-script mt-4 font-normal text-[#21BB36] text-center text-[5rem] tracking-[-0.25rem] !leading-[64px]"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        just take the
        <br />
        green pill
      </motion.h2>
      <motion.img
        src="/app-download-qrCode.svg"
        className="mt-6 w-3/5 sm:w-3/4 mx-auto overflow-clip aspect-square"
        initial={{ opacity: 0, filter: 'blur(2px)', y: '50%' }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.25,
          ease: 'circOut'
        }}
      />
      <motion.button
        className="bg-[#21BB36] border-[4px] mt-8 font-bold border-[#81DA8D] w-[90%] sm:w-5/6 flex items-center justify-center py-6 text-[#D4F5D9] text-[1.5rem] font-sans rounded-[1.5rem] shadow-xl transition-shadow hover:shadow-2xl active:shadow-md"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.75,
          duration: 0.25,
          ease: 'circOut'
        }}
        exit={{
          opacity: 0,
          y: '-100%',
          transition: {
            duration: 0.25,
            ease: 'circIn'
          }
        }}
        onClick={() => {
          window.open(
            'https://www.leapwallet.io/download',
            '_blank',
            'noopener noreferrer'
          )
        }}
      >
        Download & Use Leap
      </motion.button>
    </motion.div>
  )
}

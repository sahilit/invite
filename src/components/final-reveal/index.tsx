'use client'

import { motion } from 'framer-motion'
import { useUserStats } from '@/atoms/user-stats'

export function FinalReveal() {
  const stats = useUserStats()

  if (stats.status !== 'success' || !stats.data) {
    return null
  }

  const { total_txns: totalTransactions } = stats.data

  const heading1 =
    totalTransactions >= 5 ? (
      <>
        You did a lot
        <br />
        of things
      </>
    ) : (
      <>
        You did a little
        <br />
        of everything
      </>
    )

  const content =
    totalTransactions >= 5
      ? 'some might say, too much?'
      : 'more next year, perhaps?'

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
        {heading1}
      </motion.h1>
      <motion.h2
        className="font-script font-normal text-[#21BB36] text-center text-[8.5rem] tracking-[-0.42rem] mt-4"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.6,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        on Cosmos
      </motion.h2>
      <motion.h3
        className="font-script font-normal text-[#21BB36] text-center text-[4.5rem] tracking-[-0.22rem] -mt-5"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.6,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        this year
      </motion.h3>
      <motion.p
        className="text-[#383737] text-center font-sans font-bold text-[1.5rem] mt-12"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: [0.5, 0.8, 1, 1.2, 1],
          rotate: [0, 2, 0, -2, 0, 2, 0, -2, 0]
        }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 1.2,
          duration: 0.5,
          ease: 'circOut'
        }}
      >
        {content}
      </motion.p>
    </motion.div>
  )
}

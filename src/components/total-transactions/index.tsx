'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useUserStats } from '@/atoms/user-stats'
import { useResetToWelcomeCard } from '@/atoms/controller'
import { BottomElement } from './bottom-element'

import { useAnimatedNumber } from '@/hooks/use-animated-number'

export const TotalTransactions = () => {
  const stats = useUserStats()
  const goToWelcomeCard = useResetToWelcomeCard()

  const pRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (stats.status !== 'success') {
      goToWelcomeCard()
    }
  }, [stats.status, goToWelcomeCard])

  if (stats.status !== 'success' || !stats.data) {
    return null
  }

  const { total_txns: totalTransactions } = stats.data

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAnimatedNumber(pRef, totalTransactions, (v: number) =>
    Math.round(v).toLocaleString()
  )

  const formattedTotalTransactions = totalTransactions.toLocaleString(
    undefined,
    {
      notation: totalTransactions > 10000 ? 'compact' : 'standard'
    }
  )

  return (
    <motion.div
      className="relative flex flex-col items-center h-full w-full rounded-[2.75rem]"
      style={{
        background:
          'linear-gradient(0deg, #F3E1FC 0%, #F3E1FC 100%), linear-gradient(180deg, #CAA627 0%, #795217 100%)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.h1
        className="text-[#383737] text-center mt-[6rem]"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.15,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        <span className="font-sans text-center text-[1.5rem] font-bold tracking-[-0.1rem] block">
          You did {totalTransactions >= 5 ? 'quite a few' : 'very few'}
        </span>
        <span className="font-script text-center block text-[4rem] tracking-[-0.2rem] -mt-2">
          transactions
        </span>
      </motion.h1>
      <motion.h2
        className="text-[#383737] font-bold text-center font-sans text-[1.125rem] mt-2"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        in 2023
      </motion.h2>
      <motion.p
        ref={pRef}
        className="text-[#722397] font-sans text-center font-bold text-[7.5rem] tracking-[-0.75rem] mt-8 tabular-nums"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {totalTransactions >= 5 ? 'only ' : ''}
        {formattedTotalTransactions}
      </motion.p>
      <motion.p
        className="text-[#722397] font-sans text-center font-light text-[2.25rem] tracking-[-0.1rem] mt-2"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        to be exact!
      </motion.p>

      <BottomElement />
    </motion.div>
  )
}

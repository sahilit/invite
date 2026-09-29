'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useUserStats } from '@/atoms/user-stats'
import { useResetToWelcomeCard } from '@/atoms/controller'
import { getMonthFromNumber } from '@/utils'
import { BottomElement } from './bottom-element'
import { ActivityChart } from './activity-chart'

export const MonthlyActivity = () => {
  const stats = useUserStats()
  const goToWelcomeCard = useResetToWelcomeCard()

  useEffect(() => {
    if (stats.status !== 'success') {
      goToWelcomeCard()
    }
  }, [stats.status, goToWelcomeCard])

  if (stats.status !== 'success' || !stats.data) {
    return null
  }

  const {
    months: { most_active_month: mostActiveMonth, txns_by_month: txnsByMonth }
  } = stats.data

  const mostActiveMonthFullName = getMonthFromNumber(mostActiveMonth).long
  // @ts-ignore
  const totalTransactions = txnsByMonth[`${mostActiveMonth}`] as number
  const formattedTotalTransactions = totalTransactions.toLocaleString()

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
          There was one month
        </span>
        <span className="font-script text-center block text-[4rem] tracking-[-0.2rem] -mt-2">
          that stood out
        </span>
      </motion.h1>
      <motion.p
        className="text-[#722397] font-sans font-bold text-[6rem] text-center tracking-[-0.75rem] mt-4"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {mostActiveMonthFullName}
      </motion.p>
      <motion.p
        className="text-[#722397] font-sans font-light text-center text-[2rem] tracking-[0.2rem] mt-2"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.55,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        you did {formattedTotalTransactions} <br /> transactions!
      </motion.p>
      <motion.p
        className="text-[#722397] font-sans font-light text-center text-[1.25rem] tracking-[-0.06rem] mt-4"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.55,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        want to tell us why ;)
      </motion.p>

      <ActivityChart data={txnsByMonth} />

      <BottomElement />
    </motion.div>
  )
}

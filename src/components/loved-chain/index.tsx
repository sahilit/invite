'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { BottomElement } from './bottom-element'
import { useChains } from '@/atoms/chains'
import { useResetToWelcomeCard } from '@/atoms/controller'
import { useUserStats } from '@/atoms/user-stats'

const ChainAnimation = ({
  className = '',
  chainIcon
}: {
  className: string
  chainIcon: string
}) => (
  <motion.img
    className={`absolute z-10 border-[4px] border-[#D9D9D9] rounded-full box-content shadow-[0_5px_0_0_rgba(217,217,217,1)] ${className}`}
    initial={{ opacity: 0, y: '100%' }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.8,
      duration: 0.25,
      ease: 'circOut'
    }}
    src={chainIcon}
  />
)

export function LovedChain() {
  const stats = useUserStats()
  const goToWelcomeCard = useResetToWelcomeCard()

  const chainsRecord = useChains()

  useEffect(() => {
    if (stats.status !== 'success') {
      goToWelcomeCard()
    }
  }, [stats.status, goToWelcomeCard])

  if (stats.status !== 'success' || !stats.data) {
    return null
  }

  const {
    total_txns: totalTxn,
    chains: { txns_by_chain: txnsByChain }
  } = stats.data

  const [topChainId, topChainTransactions] = Object.entries(
    txnsByChain ?? {}
  ).sort((a, b) => {
    return b[1] - a[1]
  })[0]

  const moreThanThresholdTxn = totalTxn >= 5

  const heading1 = moreThanThresholdTxn
    ? 'There was one chain where'
    : 'This was the only chain'

  const heading2 = moreThanThresholdTxn ? 'you went all in' : 'that you loved'

  const topChainData = chainsRecord[topChainId]
  const chainIcon = topChainData.icon

  return (
    <motion.div className="relative flex flex-col items-center h-full w-full rounded-[2.75rem] sm:px-4 px-6 bg-[#FBDADA]">
      <motion.h1
        className="text-[#383737] text-center mt-[6rem]"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        <span className="font-sans text-center text-[1.5rem] font-bold tracking-[-0.05rem] block">
          {heading1}
        </span>
        <span className="font-script text-center font-normal block text-[3.5rem] tracking-[-0.21rem]">
          {heading2}
        </span>
      </motion.h1>
      <motion.h2
        className="text-[#D85C41] text-center font-sans font-bold text-[5rem] mt-4 tracking-[-0.6rem]"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {topChainData.chainName}
      </motion.h2>
      <motion.p
        className="text-[#D08787] text-center font-sans font-light text-[2.25rem] tracking-[-0.1rem] mt-3 !leading-9"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        with over{' '}
        <span className="text-[#D85C41] font-black">
          {topChainTransactions.toLocaleString()}
        </span>
        <br />
        transactions
      </motion.p>

      <div className="absolute bottom-0 sm:-bottom-16 w-full">
        <ChainAnimation
          className={
            'bottom-[173px] sm:bottom-[273px] left-[37px] sm:left-[67px] w-[24px] h-[24px]'
          }
          chainIcon={chainIcon}
        />

        <ChainAnimation
          className={
            'bottom-[120px] left-[180px] sm:bottom-[210px] w-[72px] h-[72px] sm:w-[146px] sm:h-[146px]'
          }
          chainIcon={chainIcon}
        />

        <ChainAnimation
          className={
            'bottom-[156px] sm:bottom-[256px] right-[40px] sm:right-[80px] w-[14px] h-[14px]'
          }
          chainIcon={chainIcon}
        />

        <ChainAnimation
          className={
            'bottom-[166px] sm:bottom-[166px] left-[90px] sm:left-[125px] w-[48px] h-[48px]'
          }
          chainIcon={chainIcon}
        />

        <ChainAnimation
          className={
            'bottom-[120px] sm:bottom-[120px] left-[140px] sm:left-[188px] w-[14px] h-[14px]'
          }
          chainIcon={chainIcon}
        />

        <ChainAnimation
          className={
            'bottom-[42px] sm:bottom-[142px] right-[140px] sm:right-[190px] w-[28px] h-[28px]'
          }
          chainIcon={chainIcon}
        />
      </div>

      <BottomElement />
    </motion.div>
  )
}

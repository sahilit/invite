'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'
import { BottomElement } from './bottom-element'
import { useChains } from '@/atoms/chains'
import { useUserStats } from '@/atoms/user-stats'
import { useResetToWelcomeCard } from '@/atoms/controller'

export function ExploringInterchain() {
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
    chains: {
      chains_count: chainsCount,
      ibc_transfers: ibcTransfers,
      txns_by_chain: txnsByChain
    }
  } = stats.data

  const moreThanThresholdTxns = totalTxn >= 5

  const heading1 = moreThanThresholdTxns
    ? 'You made time for'
    : 'You managed to do a little'

  const heading2 = moreThanThresholdTxns
    ? 'exploring the interchain'
    : 'exploration'

  const content =
    chainsCount >= 3 ? (
      ibcTransfers >= 5 ? (
        <>
          chains transacted on,
          <br />
          with{' '}
          <span className="text-[#D85C41] font-black">
            {ibcTransfers.toLocaleString()} IBC <br />
            transfers{' '}
          </span>{' '}
          between them!
        </>
      ) : (
        "chains transacted on, that's quite a lot!"
      )
    ) : (
      'yov have a very few favs, whoa'
    )

  const txnsByChainArray = Object.entries(txnsByChain ?? {})
    .map(([chainId, txnCount]) => ({
      chainId,
      txnCount
    }))
    .sort((a, b) => b.txnCount - a.txnCount)

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
        <span className="font-script text-center font-normal block text-[4rem] tracking-[-0.21rem]">
          {heading2}
        </span>
      </motion.h1>
      <motion.h2
        className="text-[#D85C41] text-center font-sans font-bold text-[7.5rem] sm:text-[10rem] mt-4 tracking-[-1rem] sm:tracking-[-1.5rem]"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {chainsCount}
      </motion.h2>
      <motion.p
        className="text-[#D08787] text-center font-sans font-light text-[2rem] sm:text-[2.25rem] tracking-[-0.1rem] mt-3 !leading-9"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {content}
      </motion.p>
      {txnsByChainArray.length > 0 ? (
        <motion.div
          className="flex mt-8 gap-3"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.25,
            ease: 'circOut'
          }}
        >
          {txnsByChainArray.map((data) => (
            <Image
              key={data.chainId}
              height={42}
              width={42}
              src={chainsRecord[data.chainId].icon}
              alt="chain-icon"
              className="rounded-full overflow-hidden"
            />
          ))}
        </motion.div>
      ) : null}
      <BottomElement />
    </motion.div>
  )
}

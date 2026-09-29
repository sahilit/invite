import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useResetToWelcomeCard } from '@/atoms/controller'
import { useUserStats } from '@/atoms/user-stats'
import { getMonthFromNumber } from '@/utils'
import { characterInfo } from '@/data/character'
import { useTopChain } from '@/hooks/use-top-chain'
import { useAnimatedNumber } from '@/hooks/use-animated-number'

export const Summary = () => {
  const stats = useUserStats()
  const goToWelcomeCard = useResetToWelcomeCard()

  const totalTxnsRef = useRef<HTMLParagraphElement>(null)

  const topChain = useTopChain()

  useEffect(() => {
    if (stats.status !== 'success') {
      goToWelcomeCard()
    }
  }, [stats.status, goToWelcomeCard])

  if (stats.status !== 'success' || !stats.data || !topChain) {
    return null
  }

  const {
    total_txns: totalTransactions,
    months: { most_active_month: mostActiveMonth },
    chains: { chains_count: chainsExplored },
    governance_proposals: { voted_on: votedOn },
    nfts: { bought: nftsBought },
    cosmos_character: cosmosCharacter
  } = stats.data

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAnimatedNumber(
    totalTxnsRef,
    totalTransactions,
    (v: number) => Math.round(v).toLocaleString(),
    1
  )

  const mostActiveMonthFullName = getMonthFromNumber(mostActiveMonth).long
  const formattedTotalTransactions = totalTransactions.toLocaleString(
    undefined,
    {
      notation: totalTransactions > 10000 ? 'compact' : 'standard'
    }
  )
  const formattedProposalsVotedOn = votedOn.toLocaleString()
  const formattedNFTsBought = nftsBought.toLocaleString()
  const characterData = characterInfo[cosmosCharacter]

  return (
    <motion.div
      className="relative flex flex-col items-center h-full w-full rounded-[2.75rem]"
      style={{
        background:
          'linear-gradient(180deg, #E1FBDA 0%, #F3E0FC 35.8%, #FBDADA 58.19%, #FBF9DA 84.55%, #E1FBDA 102.36%)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.h1
        className="text-[#383737] text-center mt-[4.9rem]"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.15,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        <span className="font-sans text-[1.5rem] font-bold tracking-[-0.1rem] block">
          Here&apos; everything you did
        </span>
        <span className="font-script block text-[#074810] text-[2.5rem] tracking-[-0.2rem]">
          Cosmos Wrapped &apos;23
        </span>
      </motion.h1>
      <motion.div
        layout
        layoutId="cosmos-character-image"
        className="aspect-square w-[55%] rounded-[1.8rem] flex flex-col items-center justify-end px-6 py-3 mt-4"
        style={{
          backgroundImage: `url(${characterData.image ?? '/sad-frog.svg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div
          layout
          layoutId="cosmos-character-name"
          className="text-white font-script !leading-6 p-2 text-[2.1rem] text-center backdrop-blur-[6px] drop-shadow-md rounded-2xl"
        >
          {characterInfo[cosmosCharacter].name}
        </motion.div>
      </motion.div>
      <div className="w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{
            delay: 0.25,
            duration: 0.25,
            ease: 'circOut'
          }}
          className="mt-6 w-full flex px-4 py-3 gap-4 items-center stretch rounded-[1rem] border border-[#8B45AC] bg-[#F3E0FC]"
        >
          <div className="flex flex-col items-start justify-start flex-[4] gap-1">
            <p
              ref={totalTxnsRef}
              className="flex tabular-nums text-[#722397] font-sans text-4xl font-bold leading-none tracking-[-0.2rem]"
            >
              {formattedTotalTransactions}
            </p>
            <p className="flex text-[#8B45AC] font-sans text-xs tracking-wide">
              transactions
            </p>
          </div>
          <div className="flex flex-col items-start justify-start flex-[6] gap-1">
            <p className="flex text-[#722397] font-sans text-4xl font-bold leading-none tracking-[-0.2rem]">
              {mostActiveMonthFullName}
            </p>
            <p className="flex text-[#8B45AC] font-sans text-xs tracking-wide">
              most active month
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{
            delay: 0.5,
            duration: 0.25,
            ease: 'circOut'
          }}
          className="mt-3 w-full flex px-4 py-3 gap-4 items-center stretch rounded-[1rem] border border-[#D08787] bg-[#FBDADA]"
        >
          <div className="flex flex-col items-start justify-start flex-[4] gap-1">
            <p className="flex text-[#D85C41] font-sans text-4xl font-bold leading-none tracking-[-0.2rem]">
              {chainsExplored}
            </p>
            <p className="flex text-[#D08787] font-sans text-xs tracking-wide">
              chains explored
            </p>
          </div>
          <div className="flex flex-col items-start justify-start flex-[6] gap-1">
            <p className="flex text-[#D85C41] font-sans text-4xl font-bold leading-none tracking-[-0.2rem]">
              {topChain.topChainData.chainName}
            </p>
            <p className="flex text-[#D08787] font-sans text-xs tracking-wide">
              your top chain
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{
            delay: 0.75,
            duration: 0.25,
            ease: 'circOut'
          }}
          className="flex gap-3 mt-3"
        >
          <div className="flex-[3] flex px-4 py-3 items-center stretch rounded-[1rem] border border-[#AEA957] bg-[#FBF9DA]">
            <div className="flex flex-col items-start justify-start flex-grow gap-1">
              <p className="flex text-[#CDA20B] font-sans text-4xl font-bold leading-none tracking-[-0.2rem]">
                {formattedProposalsVotedOn}
              </p>
              <p className="flex text-[#AEA957] font-sans text-xs tracking-wide">
                governance proposals voted on
              </p>
            </div>
          </div>
          <div className="flex-[2] flex px-4 py-3 items-center stretch rounded-[1rem] border border-[#AEA957] bg-[#FBF9DA]">
            <div className="flex flex-col items-start justify-start flex-grow gap-1">
              <p className="flex text-[#CDA20B] font-sans text-4xl font-bold leading-none tracking-[-0.2rem]">
                {formattedNFTsBought}
              </p>
              <p className="flex text-[#AEA957] font-sans text-xs tracking-wide">
                NFTs bought on Stargaze
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

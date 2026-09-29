'use client'

import { motion } from 'framer-motion'
import Checkmark from './check-mark'
import { BottomElement } from './bottom-element'
import { useChains } from '@/atoms/chains'
import { useResetToWelcomeCard } from '@/atoms/controller'
import { useUserStats } from '@/atoms/user-stats'
import { useEffect } from 'react'

export function Governance() {
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
    governance_proposals: {
      voted_on: votedOn,
      highest_proposals_voted_chain: highestProposalsVotedChain
    }
  } = stats.data

  const heading1 =
    votedOn > 10 ? 'You made your mark on' : "You didn't get a lot of time for"

  const content =
    votedOn > 10 ? (
      highestProposalsVotedChain ? (
        <>
          you voted the most on
          <br />
          <span className="text-[#CDA20B] font-black">
            {chainsRecord[highestProposalsVotedChain].chainName}
          </span>
        </>
      ) : (
        <>
          that&apos;s how many votes
          <br />
          you cast this year!
        </>
      )
    ) : (
      <>
        voted on. gotta do
        <br />
        more <span className="text-[#CDA20B] font-black">next year</span>
      </>
    )

  return (
    <motion.div className="relative flex flex-col items-center h-full w-full rounded-[2.75rem] sm:px-4 px-6 bg-[#FBF9DA]">
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
          governance
        </span>
      </motion.h1>
      <motion.h2
        className="text-[#CDA20B] text-center font-sans font-bold text-[5rem] mt-4 tracking-[-0.6rem]"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {votedOn} <br />
        proposals
      </motion.h2>
      {votedOn > 10 && (
        <motion.p
          className="text-[#AEA957] text-center font-sans font-light text-[2rem] tracking-[0.2rem] mt-8 !leading-8"
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.25,
            ease: 'circOut'
          }}
        >
          voted on!
        </motion.p>
      )}
      <motion.p
        className="text-[#AEA957] text-center font-sans font-light text-[1.8rem] tracking-[0.1rem] mt-8 !leading-8"
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
      <div className="hidden sm:block absolute bottom-8 z-[20]">
        <Checkmark />
      </div>
      <BottomElement />
    </motion.div>
  )
}

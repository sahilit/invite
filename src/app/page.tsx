'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, TapInfo, motion } from 'framer-motion'
import { useWalletHandler } from '@/atoms/wallet'
import {
  FlowStep,
  totalSteps,
  useFlowStep,
  useGoToNextCard,
  useGoToPreviousCard,
  useResetToWelcomeCard,
  useIsFirstVisitToWelcome,
  useGoToFirstCard
} from '@/atoms/controller'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useNFTImageUrl } from '@/hooks/use-nft-image-url'
import { useCharacterUrl } from '@/hooks/use-character-url'
import Header from '@/components/header'
import { Character } from '@/components/character'
import { CharacterWelcome } from '@/components/character-welcome'
import { DownloadApp } from '@/components/download-app'
import { ExploringInterchain } from '@/components/exploring-interchain'
import { FinalReveal } from '@/components/final-reveal'
import { Governance } from '@/components/governance'
import { LovedChain } from '@/components/loved-chain'
import { MonthlyActivity } from '@/components/monthly-activity'
import { NFT } from '@/components/nft'
import { RevealCharacter } from '@/components/reveal-character'
import { Summary } from '@/components/summary'
import { TotalTransactions } from '@/components/total-transactions'
import { WelcomeCard } from '@/components/welcome'
import { useUserStats } from '@/atoms/user-stats'

const CurrentCard: React.FC<{
  flowStep: FlowStep
  goToNextCard: () => void
  refetchUserStats: () => void
}> = ({ flowStep, goToNextCard, refetchUserStats }) => {
  switch (flowStep) {
    case FlowStep.WELCOME:
      return (
        <WelcomeCard
          startExperience={goToNextCard}
          refetchUserStats={refetchUserStats}
        />
      )
    case FlowStep.TOTAL_TRANSACTIONS:
      return <TotalTransactions />
    case FlowStep.MONTHLY_ACTIVITY:
      return <MonthlyActivity />
    case FlowStep.EXPLORING_INTERCHAIN:
      return <ExploringInterchain />
    case FlowStep.LOVED_CHAIN:
      return <LovedChain />
    case FlowStep.GOVERNANCE:
      return <Governance />
    case FlowStep.NFT:
      return <NFT />
    case FlowStep.FinalReveal:
      return <FinalReveal />
    case FlowStep.CharacterWelcome:
      return <CharacterWelcome />
    case FlowStep.DownloadApp:
      return <DownloadApp />
    case FlowStep.RevealCharacter:
      return <RevealCharacter onReveal={goToNextCard} />
    case FlowStep.Character:
      return <Character />
    case FlowStep.Summary:
      return <Summary />
    default:
      return null
  }
}

const stepArray = Array.from({ length: totalSteps })

const ProgressIndicator: React.FC<{ flowStep: FlowStep }> = ({ flowStep }) => {
  const currentStep = flowStep - 1

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex w-full gap-1">
        {stepArray.map((_, index) => {
          const isLtEqCurrentStep = index <= currentStep

          return (
            <motion.div
              key={index}
              className="flex-1 h-1 overflow-hidden rounded-sm bg-[#444444]"
            >
              <motion.div
                className="h-1 w-full bg-green-300"
                initial={false}
                animate={{
                  width: isLtEqCurrentStep ? '100%' : '0%'
                }}
                transition={{
                  duration: 0.25,
                  ease: 'easeIn'
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const Preloads = () => {
  const nftImageUrl = useNFTImageUrl()
  const characterUrl = useCharacterUrl()

  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://assets.leapwallet.io/cosmos-characters/shocked-froge.webp"
      />
      {nftImageUrl.data ? (
        <link rel="preload" as="image" href={nftImageUrl.data.media.url} />
      ) : null}
      {characterUrl ? (
        <link rel="preload" as="image" href={characterUrl} />
      ) : null}
    </>
  )
}

const AnotherWalletBanner: React.FC<{
  flowStep: FlowStep
}> = ({ flowStep }) => {
  const goToFirstCard = useGoToFirstCard()

  return (
    <AnimatePresence>
      {flowStep === FlowStep.Summary ? (
        <motion.div
          key="summary"
          className="absolute flex w-full items-center z-10 bottom-0 left-0 px-6 pb-5 justify-center"
          initial={{ y: '100%' }}
          animate={{ y: '0' }}
          transition={{
            delay: 1.2,
            duration: 0.25
          }}
        >
          <button
            onClick={goToFirstCard}
            className="bg-[#21BB36] w-4/5 py-3 px-4 rounded-[32px] text-center text-white font-san font-normal text-[1rem] cursor-pointer shadow-xl"
          >
            View for another wallet?
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { refetchUserStats } = useWalletHandler()
  const stats = useUserStats()

  const flowStep = useFlowStep()

  const goToNextCard = useGoToNextCard()
  const goToPreviousCard = useGoToPreviousCard()

  const isFirstVisitToWelcome = useIsFirstVisitToWelcome()

  const handleTap = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo) => {
      if (
        event.target instanceof HTMLButtonElement ||
        event.target instanceof HTMLAnchorElement ||
        (event.target as HTMLElement).hasAttribute('ignore-click')
      ) {
        return
      }

      if (flowStep === FlowStep.WELCOME || !containerRef.current) {
        return
      }

      // check for mobile using matchMedia
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches

      if (!isCoarsePointer) {
        // not mobile, so don't handle tap
        return
      }

      const rect = containerRef.current.getBoundingClientRect()
      const tapX = info.point.x
      const cardWidth = rect.width
      const cardX = rect.x

      const isTapOnLeftSideFirstThirdOfCard = tapX < cardX + cardWidth / 3

      if (isTapOnLeftSideFirstThirdOfCard) {
        goToPreviousCard()
      } else {
        goToNextCard()
      }
    },
    [flowStep, goToNextCard, goToPreviousCard]
  )

  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (flowStep === FlowStep.WELCOME && stats.status === 'loading') {
        return
      }

      if (event.key === 'ArrowLeft') {
        goToPreviousCard()
      } else if (event.key === 'ArrowRight') {
        goToNextCard()
      }
    }

    document.addEventListener('keydown', keyDownListener)

    return () => {
      document.removeEventListener('keydown', keyDownListener)
    }
  }, [goToNextCard, goToPreviousCard, stats.status, flowStep])

  return (
    <motion.main
      className="flex items-center justify-center h-[100svh] w-[100svw] z-0"
      onTap={handleTap}
    >
      <div className="hidden sm:block w-[56px]">
        <AnimatePresence>
          {flowStep === FlowStep.WELCOME ? null : (
            <motion.button
              initial={{ opacity: 0, x: '3rem' }}
              animate={{ opacity: 1, x: '0' }}
              exit={{ opacity: 0, x: '3rem' }}
              transition={{
                damping: 50
              }}
              title="Go to previous story"
              className="hidden text-[#222222] sm:flex p-1 mr-8 rounded-full bg-gray-100 items-center justify-center shadow"
              onClick={goToPreviousCard}
            >
              <ArrowLeft weight="bold" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <Preloads />
      <div className="h-[100svh] z-[10] w-full max-w-[90svw] sm:max-w-[24rem] gap-6 flex flex-col items-center justify-center py-4">
        <ProgressIndicator flowStep={flowStep} />
        <motion.div
          ref={containerRef}
          className="relative touch-pan-y h-full w-full rounded-[2.75rem] overflow-clip max-h-[90svh] sm:max-h-[46rem] "
        >
          <Header flowStep={flowStep} />
          <CurrentCard
            flowStep={flowStep}
            goToNextCard={goToNextCard}
            refetchUserStats={refetchUserStats}
          />
          <AnotherWalletBanner flowStep={flowStep} />
        </motion.div>
      </div>
      <div className="hidden sm:block w-[56px]">
        <AnimatePresence>
          {flowStep === FlowStep.Summary ||
          (flowStep === FlowStep.WELCOME && isFirstVisitToWelcome) ? null : (
            <motion.button
              initial={{ opacity: 0.5, x: '-3rem' }}
              animate={{ opacity: 1, x: '0' }}
              exit={{ opacity: 0.5, x: '-3rem' }}
              transition={{
                damping: 50
              }}
              title="Go to next story"
              className="hidden text-[#222222] sm:flex p-1 ml-8 rounded-full bg-gray-100 items-center justify-center shadow"
              onClick={goToNextCard}
            >
              <ArrowRight weight="bold" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  )
}

export default HomePage

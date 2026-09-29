'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useResetToWelcomeCard } from '@/atoms/controller'
import { useUserStats } from '@/atoms/user-stats'

export function RevealCharacter({ onReveal }: { onReveal: () => void }) {
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

  return (
    <motion.div
      className="relative flex flex-col justify-center items-center h-full w-full rounded-[2.75rem] bg-[#D4F5D9] px-8"
      style={{
        background: 'url(/bg-final.svg), #D4F5D9',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.h1
        className="text-[#383737] text-center"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.15,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        <span className="font-sans text-[1.6875rem] font-bold tracking-[-0.1rem] block">
          What&apos;s Your
        </span>
        <span className="font-script block text-[4.2rem] tracking-[-0.2rem]">
          cosmos character
        </span>
      </motion.h1>
      <motion.div
        layout
        layoutId="cosmos-character-image"
        className="mt-4 flex items-center justify-center aspect-square w-4/5 rounded-[1.8rem] overflow-hidden bg-[#C0F9B1] shadow-md"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        <span className="font-script text-7xl text-gray-600">?</span>
      </motion.div>
      <motion.button
        className="bg-[#21BB36] !leading-8 border-[4px] mt-8 font-bold border-[#81DA8D] w-[90%] sm:w-5/6 flex items-center justify-center py-6 text-[#D4F5D9] text-[1.5rem] font-sans rounded-[1.5rem] shadow-xl transition-shadow hover:shadow-2xl active:shadow-md"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
        exit={{
          opacity: 0,
          y: '-100%',
          transition: {
            delay: 0.4,
            duration: 0.25,
            ease: 'circIn'
          }
        }}
        onClick={onReveal}
      >
        Tap to Reveal
      </motion.button>
    </motion.div>
  )
}

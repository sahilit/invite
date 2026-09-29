'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useResetToWelcomeCard } from '@/atoms/controller'
import { useUserStats } from '@/atoms/user-stats'
import { characterInfo } from '@/data/character'

export function Character() {
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

  const { cosmos_character: cosmosCharacter } = stats.data

  const characterData = characterInfo[cosmosCharacter]

  return (
    <motion.div className="relative flex flex-col items-center h-full w-full rounded-[2.75rem] bg-[#D4F5D9] sm:px-4 px-6">
      <motion.div
        layout
        layoutId="cosmos-character-image"
        className="aspect-square w-5/6 mt-[6rem] rounded-[1.8rem]"
        style={{
          backgroundImage: `url(${characterData.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <motion.h1
        layout
        layoutId="cosmos-character-name"
        className="font-script font-normal text-[#21BB36] text-center text-[5rem] tracking-[-0.25rem] !leading-[58px] mt-8"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {characterData.name}
      </motion.h1>
      <motion.p
        className="text-[#383737] text-center font-sans font-medium text-[1.4rem] tracking-[-0.07rem] mt-6 !leading-7"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{
          delay: 0.6,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {characterData.description}
      </motion.p>
    </motion.div>
  )
}

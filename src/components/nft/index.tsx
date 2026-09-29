'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useUserStats } from '@/atoms/user-stats'
import { useResetToWelcomeCard } from '@/atoms/controller'
import { BottomElement } from './bottom-element'
import { useNFTImageUrl } from '@/hooks/use-nft-image-url'

export function NFT() {
  const stats = useUserStats()
  const goToWelcomeCard = useResetToWelcomeCard()

  const nftImageUrl = useNFTImageUrl()

  useEffect(() => {
    if (stats.status !== 'success') {
      goToWelcomeCard()
    }
  }, [stats.status, goToWelcomeCard])

  if (stats.status !== 'success' || !stats.data) {
    return null
  }

  const {
    nfts: { bought, priciest }
  } = stats.data

  const heading1 =
    bought > 0 ? (
      priciest && priciest.price > 2500 ? (
        'oh, before we forget'
      ) : (
        <>
          oh, before we forget,
          <br />
          you purchased
        </>
      )
    ) : (
      'no NFTs purchased on Stargaze'
    )

  const heading2 =
    bought > 0 ? (
      priciest && priciest.price > 2500 ? (
        <>this was your priciest NFT</>
      ) : (
        `${bought} NFTs`
      )
    ) : (
      "we're shocked!"
    )

  const content =
    bought > 0 ? (
      priciest && priciest.price > 2500 ? (
        <>
          bought for{' '}
          <span className="text-[#9E053D] font-black">
            {priciest.price.toLocaleString()} STARS
          </span>
          <br />
          on Stargaze
        </>
      ) : (
        <>
          on <strong>Stargaze</strong>
        </>
      )
    ) : (
      <>
        drop us a DM, we&apos;ll help you
        <br />
        get a big one!
      </>
    )

  return (
    <motion.div className="relative flex flex-col items-center h-full w-full rounded-[2.75rem] sm:px-4 px-6 bg-[#FBDAE6]">
      <motion.div
        className="aspect-square w-5/6 mt-[6rem] rounded-[1.8rem]"
        initial={{ opacity: 0, y: '-50%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.25,
          ease: 'circOut'
        }}
        style={{
          backgroundImage: `url(${
            bought > 0 && nftImageUrl.data?.media.url
              ? nftImageUrl.data.media.url
              : 'https://assets.leapwallet.io/cosmos-characters/shocked-froge.webp'
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'top'
        }}
      />
      <motion.p
        className="text-[#383737] text-center mt-9 font-sans text-[1.69rem] font-bold tracking-[-0.05rem]"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.25,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {heading1}
      </motion.p>
      <motion.p
        className="text-[#9E053D] text-center font-script font-normal text-[4.5rem] sm:text-[5.63rem] tracking-[-0.28rem] !leading-[4rem] !sm:leading-[5rem] mt-4"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {heading2}
      </motion.p>
      <motion.p
        className="text-[#383737] text-center font-sans font-medium text-[1.25rem] mt-6 !leading-5"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        {content}
      </motion.p>
      <BottomElement />
    </motion.div>
  )
}

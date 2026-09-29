'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FrogOne } from '@/components/assets/frog-one'
import { PoweredByNumia } from '@/components/powered-by-numia'
import { FrogTwo } from '@/components/assets/frog-two'
import { useChainsList } from '@/atoms/chains'
import { FrogThree } from '@/components/assets/frog-three'
import {
  useConnectWallet,
  useDisconnectWallet,
  useWallet
} from '@/atoms/wallet'
import { useUserStats } from '@/atoms/user-stats'
import { useIsFirstVisitToWelcome } from '@/atoms/controller'
import { sliceAddress } from '@/utils'

export function WelcomeCard({
  startExperience,
  refetchUserStats
}: {
  startExperience: () => void
  refetchUserStats: () => void
}) {
  const chains = useChainsList()
  const wallet = useWallet()
  const userStats = useUserStats()
  const isFirstVisitToWelcome = useIsFirstVisitToWelcome()

  const twoParts = useMemo(() => {
    return [chains.slice(0, 10), chains.slice(10, 19)]
  }, [chains])

  const connectWallet = useConnectWallet()
  const disconnectWallet = useDisconnectWallet()

  useEffect(() => {
    if (
      isFirstVisitToWelcome &&
      userStats.status === 'success' &&
      userStats.data !== null
    ) {
      startExperience()
    }
  }, [isFirstVisitToWelcome, startExperience, userStats])

  return (
    <motion.div
      className="relative flex flex-col items-center h-full w-full rounded-[2.75rem]"
      style={{
        background: 'url(/bg-welcome.svg), #D4F5D9',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.h1
        className="text-[#074810] text-center mt-[4rem]"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.15,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        <span className="font-sans text-[3rem] xs:text-[3.375rem] font-bold tracking-[-0.1rem] block">
          Your Cosmos
        </span>
        <span className="font-script block text-[7rem] xs:text-[8.4rem] tracking-[-0.35rem] -mt-2">
          wrapped
        </span>
      </motion.h1>
      <motion.h2
        className="text-[#074810] text-center font-sans text-[2.25rem] my-4"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{
          delay: 0.4,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        for 2023
      </motion.h2>
      <AnimatePresence mode="wait">
        {wallet.status !== 'connected' ? (
          <motion.button
            className="bg-[#21BB36] border-[4px] font-bold border-[#81DA8D] w-5/6 flex items-center justify-center py-6 text-[#D4F5D9] mt-6 sm:mt-12 text-[1.5rem] font-sans rounded-[1.5rem] shadow-xl transition-shadow hover:shadow-2xl active:shadow-md"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.65,
              duration: 0.25,
              ease: 'circOut'
            }}
            exit={{
              opacity: 0,
              y: '-100%',
              transition: {
                duration: 0.25,
                ease: 'circIn'
              }
            }}
            disabled={wallet.status === 'loading'}
            onClick={connectWallet}
          >
            {wallet.status === 'loading'
              ? 'Wallet is Connecting...'
              : 'Connect Wallet to Start'}
          </motion.button>
        ) : null}
        {userStats.status === 'success' ? (
          <>
            {userStats.data === null ? (
              <motion.p
                className="text-center mt-12 font-sans text-black font-bold text-[1.25rem] !leading-[1.25] max-w-[24rem] mx-auto"
                initial={{ opacity: 0, y: '-100%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  ease: 'circOut'
                }}
              >
                Sorry, we could&apos;t find any activity in 2023 for your
                address.
              </motion.p>
            ) : (
              <>
                {isFirstVisitToWelcome ? (
                  <motion.button
                    className="bg-[#21BB36] border-[4px] font-bold border-[#81DA8D] w-5/6 flex items-center justify-center py-6 text-[#D4F5D9] mt-20 sm:mt-32 text-[1.5rem] font-sans rounded-[1.5rem] shadow-xl transition-shadow hover:shadow-2xl active:shadow-md"
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.65,
                      duration: 0.25,
                      ease: 'circOut'
                    }}
                    exit={{
                      opacity: 0,
                      y: '-100%',
                      transition: {
                        duration: 0.25,
                        ease: 'circIn'
                      }
                    }}
                    onClick={startExperience}
                  >
                    Start
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      className="bg-[#21BB36] border-[4px] px-10 font-bold border-[#81DA8D] w-5/6 flex items-center justify-center py-6 text-[#D4F5D9] mt-4 text-[1.25rem] font-sans rounded-[2rem] shadow-xl transition-shadow hover:shadow-2xl active:shadow-md"
                      initial={{ opacity: 0, y: '-100%' }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.25,
                        duration: 0.25,
                        ease: 'circOut'
                      }}
                      exit={{
                        opacity: 0,
                        y: '-100%',
                        transition: {
                          duration: 0.25,
                          ease: 'circIn'
                        }
                      }}
                      onClick={startExperience}
                    >
                      {sliceAddress(userStats.data.address)}
                    </motion.button>
                    <motion.button
                      className="bg-red-500 border-[3px] font-bold border-red-200/70 w-5/6 flex items-center justify-center py-[10px] text-[#F4D4D4] mt-2 text-[1rem] font-sans rounded-[1.5rem] shadow-xl transition-shadow hover:shadow-2xl active:shadow-md"
                      initial={{ opacity: 0, y: '-100%' }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.25,
                        duration: 0.25,
                        ease: 'circOut'
                      }}
                      exit={{
                        opacity: 0,
                        y: '-100%',
                        transition: {
                          duration: 0.25,
                          ease: 'circIn'
                        }
                      }}
                      onClick={disconnectWallet}
                    >
                      Disconnect wallet
                    </motion.button>
                  </>
                )}
              </>
            )}
          </>
        ) : null}
        {!(userStats.status === 'success' && userStats.data === null) ? (
          <motion.div className="mt-6 max-w-[20rem] mx-auto">
            <motion.p
              className="text-center font-sans text-black font-bold text-[1rem] leading-normal tracking-[-0.03rem]"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.25,
                ease: 'circOut'
              }}
            >
              in partnership with our frens on the interchain
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.25,
                ease: 'circOut'
              }}
              className="mt-3 space-y-1.5"
            >
              {twoParts.map((chainGroup, groupIndex) => (
                <motion.li
                  key={groupIndex}
                  className="list-none grid justify-items-center justify-center"
                  style={{
                    gridTemplateColumns: `repeat(${chainGroup.length}, minmax(0, 1fr))`,
                    marginRight: `${groupIndex === 1 ? '2rem' : '1rem'}`,
                    marginLeft: `${groupIndex === 1 ? '2rem' : '1rem'}`
                  }}
                >
                  {chainGroup.map((chain, index) => (
                    <motion.img
                      draggable={false}
                      title={chain.chainName}
                      className="flex items-center justify-center h-6 w-6 rounded-full overflow-clip bg-[#222222] shadow"
                      key={chain.chainId}
                      src={chain.icon}
                      initial={{ opacity: 0, y: '-20%' }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.5 + groupIndex * 6 * 0.05 + index * 0.05,
                        duration: 0.1,
                        ease: 'circOut'
                      }}
                    />
                  ))}
                </motion.li>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
        {userStats.status === 'error' ? (
          <div className="mt-20">
            <motion.p
              className="text-center font-sans !leading-[1.25] text-black font-bold text-[1.5rem] max-w-[22rem] mx-auto"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                ease: 'circOut'
              }}
            >
              Couldn&apos;t fetch your data. Please check your connection.
            </motion.p>
            <motion.button
              className="mx-auto bg-red-500 border-[4px] font-bold border-red-300 w-5/6 flex items-center justify-center py-6 text-white mt-12 text-[1.5rem] font-sans rounded-[1.5rem] shadow-xl transition-shadow hover:shadow-2xl active:shadow-md"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                ease: 'circOut'
              }}
              exit={{
                opacity: 0,
                y: '-100%',
                transition: {
                  duration: 0.25,
                  ease: 'circIn'
                }
              }}
              onClick={refetchUserStats}
            >
              Try Again
            </motion.button>
          </div>
        ) : null}
      </AnimatePresence>
      <motion.div
        className="absolute bottom-14 left-0 w-full z-10 flex items-center justify-center"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 0.25,
          ease: 'circOut'
        }}
      >
        <PoweredByNumia />
      </motion.div>
      <AnimatePresence mode="wait">
        {(() => {
          switch (userStats.status) {
            case 'idle':
              return <FrogOne />
            case 'loading':
              return <FrogTwo />
            case 'error':
              return <FrogThree />
            case 'success': {
              if (userStats.data === null) {
                return <FrogThree />
              }
              return <FrogOne exitOnly={true} />
            }
          }
        })()}
      </AnimatePresence>
    </motion.div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ShareModal } from './share-modal/share-modal'
import { FlowStep } from '@/atoms/controller'
import { Share } from '@phosphor-icons/react'

const hideHeaderPage = [
  FlowStep.WELCOME,
  FlowStep.FinalReveal,
  FlowStep.CharacterWelcome,
  FlowStep.DownloadApp,
  FlowStep.RevealCharacter
]

export default function Header({ flowStep }: { flowStep: FlowStep }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  useEffect(() => {
    setIsShareModalOpen(false)
    // when flowStep changes, close the modal
  }, [flowStep])

  if (hideHeaderPage.includes(flowStep)) {
    return null
  }

  return (
    <div
      id="header"
      className="absolute flex w-full items-center z-10 top-0 left-0 px-6 pt-5"
    >
      <Image src="/logo.svg" alt="leap-logo" width={80} height={25} />
      <p className="font-script font-normal ml-3 text-[1.25rem] text-[#074810] mr-auto">
        Cosmos Wrapped &apos;23
      </p>
      <button
        className="flex item-center gap-2 py-2 px-3 font-bold !leading-6 bg-[#21BB36] text-white rounded-2xl cursor-pointer"
        onClick={(e) => setIsShareModalOpen(true)}
      >
        <span ignore-click="true">Share</span>
        <Share ignore-click="true" weight="bold" className="self-center" />
      </button>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        flowStep={flowStep}
      />
    </div>
  )
}

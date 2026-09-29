import { AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import { createHmac } from 'crypto'
import useSWR, { unstable_serialize } from 'swr'
import { ArrowDown, SpinnerGap } from '@phosphor-icons/react'
import { FlowStep, FlowStepLabels } from '@/atoms/controller'
import { UserStats, useUserStats } from '@/atoms/user-stats'
import { generateImage } from '@/dynamic-images/generate-frontend'
import {
  useCharacterName,
  useCharacterSmallUrl
} from '@/hooks/use-character-url'
import { useNFTImageUrl } from '@/hooks/use-nft-image-url'
import { ChainData, getMonthFromNumber } from '@/utils'
import chainsData from '@/data/chains.json'
import { Modal } from '../modal'
import { ShareCard } from './card'
import { getTweetContent } from './tweet-content'

function getToken(data: any): string {
  const hmac = createHmac('sha256', 'my_secret')
  hmac.update(JSON.stringify({ data }))
  const token = hmac.digest('hex')
  return token
}

function initResvgWorker() {
  if (typeof window === 'undefined') return

  const worker = new Worker(
    new URL('@/dynamic-images/resvg-worker.ts', import.meta.url),
    {
      type: 'module'
    }
  )

  const pending = new Map()

  worker.onmessage = (e) => {
    const { _id, url } = e.data
    const resolve = pending.get(_id)
    if (resolve) {
      resolve(url)
      pending.delete(_id)
    }
  }

  return async (msg: object) => {
    const _id = Math.random()
    worker.postMessage({
      ...msg,
      _id
    })
    return new Promise((resolve) => {
      pending.set(_id, resolve)
    })
  }
}

const renderPNG = initResvgWorker()

const ShareOptions: React.FC<{
  flowStep: FlowStep
  data: UserStats
}> = ({ flowStep, data }) => {
  const { data: NFTUrl, isLoading: isLoadingNFTData } = useNFTImageUrl()
  const characterUrl = useCharacterSmallUrl()
  const characterName = useCharacterName()

  const [topChainId, topChainTransactions] = Object.entries(
    data.chains.txns_by_chain ?? {}
  ).sort((a, b) => {
    return b[1] - a[1]
  })[0]
  const topChainData = chainsData[
    topChainId as keyof typeof chainsData
  ] as ChainData

  const txnList = Object.entries(data.months.txns_by_month).map(
    ([num, txnCount]) => {
      const month = getMonthFromNumber(num)
      return {
        month,
        txnCount
      }
    }
  )

  const mostActiveMonth = txnList.reduce((acc, curr) =>
    acc.txnCount > curr.txnCount ? acc : curr
  )

  const element =
    isLoadingNFTData || !characterUrl || !characterName ? null : (
      <ShareCard
        flowStep={flowStep}
        characterUrl={characterUrl}
        characterName={characterName}
        totalTransactions={data.total_txns}
        mostActiveMonth={mostActiveMonth.month.long}
        mostActiveMonthTransactions={mostActiveMonth.txnCount}
        chainsCount={data.chains.chains_count}
        topChainName={topChainData.chainName}
        topChainIcon={topChainData.icon}
        topChainTransactions={topChainTransactions}
        txnByChain={data.chains.txns_by_chain}
        ibcTransactions={data.chains.ibc_transfers}
        proposalVotedOn={data.governance_proposals.voted_on}
        mostVotesOnChainId={
          data.governance_proposals.highest_proposals_voted_chain
        }
        nftsBought={data.nfts.bought}
        mostExpensiveNFTPrice={data.nfts.priciest?.price}
        nftsCountNumber={data.nfts.bought}
        nftUrl={NFTUrl?.media.url}
      />
    )

  const svgQuery = useSWR(
    element ? unstable_serialize(['svg', element]) : null,
    async () => {
      if (!element) {
        throw new Error('No element')
      }
      return {
        step: flowStep,
        image: await generateImage(element)
      }
    }
  )

  const pngQuery = useSWR(
    svgQuery.data ? unstable_serialize(['png', svgQuery.data.step]) : null,
    async () => {
      if (!svgQuery.data) {
        throw new Error('No svg')
      }
      const res = await renderPNG?.({
        svg: svgQuery.data.image,
        width: 1200,
        height: 900
      })
      return res as string
    }
  )

  const tweetIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    getTweetContent(flowStep) + '\n\n'
  )}&url=${encodeURIComponent(
    `${window.location.origin}/share/review?cosmosAddress=${data.address}`
  )}`

  useEffect(() => {
    const token = getToken({
      cosmosAddress: data.address
    })
    console.log(token)
  }, [data.address])

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[240px] xs:w-[300px] h-max py-2">
      <p className="font-sans text-2xl text-gray-100 w-full">
        Share This Story
      </p>
      <div
        className="w-full flex items-center justify-center rounded-xl mt-2 bg-[#333333]"
        style={{
          aspectRatio: '12 / 9'
        }}
      >
        {pngQuery.data ? (
          <img
            src={pngQuery.data}
            className="w-full block rounded-xl"
            alt="image"
          />
        ) : null}
        <SpinnerGap
          weight="light"
          size={32}
          className="animate-spin text-green-300"
        />
      </div>
      <div className="flex gap-4 items-center mt-2 w-full px-2">
        <div className="flex flex-col justify-center items-center gap-2">
          <a
            href={tweetIntent}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#222222] font-medium rounded-full w-12 h-12 flex items-center justify-center"
          >
            <svg
              height="24"
              viewBox="0 0 1200 1227"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                fill="#222222"
              />
            </svg>
          </a>
          <p className="text-center text-[#C5C5C5] font-sans font-light">X</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <a
            href={pngQuery.data}
            download={`cosmos-wrapped-23-${FlowStepLabels[flowStep]}.png`}
            className={`bg-white text-[#222222] font-medium rounded-full w-12 h-12 flex items-center justify-center ${
              pngQuery.data ? '' : 'opacity-50'
            }`}
          >
            <ArrowDown weight="light" size={32} />
          </a>
          <p className="text-center text-[#C5C5C5] font-sans font-light">
            Download
          </p>
        </div>
      </div>
    </div>
  )
}

export const ShareModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  flowStep: FlowStep
}> = ({ isOpen, onClose, flowStep }) => {
  const data = useUserStats()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (data.status !== 'success' || !data.data) {
    return null
  }

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
      {isOpen ? (
        <Modal
          className="rounded-3xl bg-[#141614] shadow-xl"
          handleClose={onClose}
        >
          <ShareOptions data={data.data} flowStep={flowStep} />
        </Modal>
      ) : null}
    </AnimatePresence>
  )
}

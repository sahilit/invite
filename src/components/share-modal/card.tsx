import React from 'react'
import TotalTransactions from '@/components/shareable-cards/total-transactions'
import MonthlyActivity from '@/components/shareable-cards/monthly-activity'
import ExploringInterchain from '@/components/shareable-cards/exploring-interchain'
import LovedChain from '@/components/shareable-cards/loved-chain'
import Governance from '@/components/shareable-cards/governance'
import NFT from '@/components/shareable-cards/nft'
import Character from '@/components/shareable-cards/character'
import Review from '@/components/shareable-cards/review'
import { FlowStep } from '@/atoms/controller'

export const ShareCard: React.FC<{
  characterUrl: string
  characterName: string
  totalTransactions: number
  mostActiveMonth: string
  mostActiveMonthTransactions: number
  chainsCount: number
  topChainName: string
  topChainIcon: string
  topChainTransactions: number
  txnByChain: Record<string, number> | undefined
  ibcTransactions: number
  proposalVotedOn: number
  mostVotesOnChainId: string | undefined
  nftsBought: number
  flowStep: FlowStep
  mostExpensiveNFTPrice: number | undefined
  nftsCountNumber: number
  nftUrl: string | undefined
}> = ({ flowStep, ...data }) => {
  switch (flowStep) {
    case FlowStep.TOTAL_TRANSACTIONS:
      return <TotalTransactions transactions={data.totalTransactions} />
    case FlowStep.MONTHLY_ACTIVITY: {
      return (
        <MonthlyActivity
          month={data.mostActiveMonth}
          transactions={data.mostActiveMonthTransactions}
        />
      )
    }
    case FlowStep.EXPLORING_INTERCHAIN:
      return (
        <ExploringInterchain
          chains={data.chainsCount}
          txnsByChain={data.txnByChain}
          transactions={data.ibcTransactions}
        />
      )
    case FlowStep.LOVED_CHAIN: {
      return (
        <LovedChain
          chainName={data.topChainName}
          chainLogo={data.topChainIcon}
          transactions={data.topChainTransactions}
        />
      )
    }
    case FlowStep.GOVERNANCE:
      return (
        <Governance
          proposals={data.proposalVotedOn}
          votedMostOnChainId={data.mostVotesOnChainId}
        />
      )
    case FlowStep.NFT: {
      return (
        <NFT
          mostExpensiveNFTPrice={data.mostExpensiveNFTPrice ?? 0}
          nftsCountNumber={data.nftsCountNumber}
          nftUrl={data.nftUrl}
        />
      )
    }
    case FlowStep.Character: {
      return (
        <Character
          characterImage={data.characterUrl}
          characterName={data.characterName}
        />
      )
    }
    case FlowStep.Summary:
    default: {
      return (
        <Review
          characterUrl={data.characterUrl}
          characterName={data.characterName}
          totalTransactions={data.totalTransactions}
          mostActiveMonth={data.mostActiveMonth}
          chainsCount={data.chainsCount}
          topChainName={data.topChainName}
          proposalVotedOn={data.proposalVotedOn}
          nftsBought={data.nftsBought}
        />
      )
    }
  }
}

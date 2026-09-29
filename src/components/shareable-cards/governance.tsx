import React from 'react'
import ShareLayout from './common/share-layout'
import { heading1, heading2, heading3, satoshiText } from './common/styles'
import chainsData from '@/data/chains.json'
import { type ChainData } from '@/utils'

interface GovernanceProps {
  proposals: number
  votedMostOnChainId: string | undefined
}

export default function Governance({
  proposals,
  votedMostOnChainId
}: GovernanceProps) {
  const chainData = votedMostOnChainId
    ? (chainsData[votedMostOnChainId as keyof typeof chainsData] as ChainData)
    : undefined

  return (
    <ShareLayout backgroundColor="#FBF9DA">
      <p style={heading1}>My interchain</p>
      <p style={heading2}>governance</p>
      <p style={heading3}>in 2023</p>
      <div
        style={{
          ...satoshiText,
          color: '#CDA20B',
          fontSize: '12.5rem',
          letterSpacing: '-1.5rem',
          lineHeight: '55%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <span>{proposals}</span>
        <span
          style={{
            fontSize: '7.5rem',
            letterSpacing: '-0.45rem',
            marginTop: '3rem'
          }}
        >
          proposals
        </span>
      </div>
      {chainData ? (
        <div
          style={{
            ...satoshiText,
            color: '#AEA957',
            fontSize: '2rem',
            fontWeight: 500,
            marginTop: '4rem',
            letterSpacing: '0.375rem',
            lineHeight: '113%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <span>I also voted the most on</span>
          <span
            style={{
              color: '#CDA20B',
              fontWeight: 900
            }}
          >
            {chainData.chainName}!
          </span>
        </div>
      ) : null}
    </ShareLayout>
  )
}

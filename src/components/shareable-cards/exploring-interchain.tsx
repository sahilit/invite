import React from 'react'
import ShareLayout from './common/share-layout'
import { heading1, heading2, heading3, satoshiText } from './common/styles'
import chainsData from '@/data/chains.json'

interface ExploringInterchainProps {
  chains: number
  transactions: number
  txnsByChain: Record<string, number> | undefined
}

export default function ExploringInterchain({
  chains,
  transactions,
  txnsByChain
}: ExploringInterchainProps) {
  const topFiveChains = Object.entries(txnsByChain || {})
    .map(([chain, txns]) => ({
      // @ts-ignore
      chain: chainsData[chain] as {
        icon: string
      },
      txns
    }))
    .sort((a, b) => b.txns - a.txns)
    .slice(0, 5)

  return (
    <ShareLayout backgroundColor="#FBDADA">
      <p style={heading1}>My interchain</p>
      <p style={heading2}>exploration</p>
      <p style={heading3}>in 2023</p>
      <div
        style={{
          display: 'flex'
        }}
      >
        <p
          style={{
            ...satoshiText,
            color: '#D85C41',
            fontSize: '15rem',
            letterSpacing: '-1.5rem',
            marginTop: '-1rem'
          }}
        >
          {chains}
        </p>
        {txnsByChain ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '6rem'
            }}
          >
            {topFiveChains.map((data, index) => (
              <img
                key={index}
                height={42}
                width={42}
                src={data.chain.icon}
                alt="chain-icon"
                style={{ marginRight: 8 }}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div
        style={{
          ...satoshiText,
          display: 'flex',
          flexDirection: 'column',
          color: '#D08787',
          fontSize: '2rem',
          fontWeight: 500,
          marginTop: '1rem',
          letterSpacing: '0.375rem',
          lineHeight: '113%'
        }}
      >
        <span>chains explored, with</span>
        <span
          style={{
            color: '#D85C41',
            fontWeight: 900
          }}
        >
          {transactions.toLocaleString()} IBC transactions
        </span>
        <span>on them!</span>
      </div>
    </ShareLayout>
  )
}

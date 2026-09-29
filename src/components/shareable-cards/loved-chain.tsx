import React from 'react'
import ShareLayout from './common/share-layout'
import { heading1, heading2, heading3, satoshiText } from './common/styles'

interface LovedChainProps {
  chainName: string
  chainLogo: string
  transactions: number
}

export default function LovedChain({
  chainName,
  chainLogo,
  transactions
}: LovedChainProps) {
  return (
    <ShareLayout backgroundColor="#FBDADA">
      <p style={heading1}>This was my</p>
      <p style={heading2}>top chain</p>
      <p style={heading3}>in 2023</p>
      <img height={120} width={120} src={chainLogo} alt="chain-icon" />
      <p
        style={{
          ...satoshiText,
          color: '#D85C41',
          fontSize: chainName.length > 8 ? '7rem' : '8.75rem',
          letterSpacing: chainName.length > 8 ? '-0.7rem' : '-0.9rem',
          marginTop: '1rem'
        }}
      >
        {chainName}
      </p>
      <div
        style={{
          ...satoshiText,
          color: '#D08787',
          fontSize: '2rem',
          fontWeight: 500,
          marginTop: '1rem',
          letterSpacing: '0.375rem',
          lineHeight: '113%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <span>
          with over{' '}
          <span
            style={{
              color: '#D85C41',
              fontWeight: 900,
              marginLeft: '0.5rem',
              marginRight: '0.5rem'
            }}
          >
            {transactions.toLocaleString(undefined, {
              notation: transactions > 10000 ? 'compact' : 'standard'
            })}
          </span>
        </span>
        <span>transactions</span>
      </div>
    </ShareLayout>
  )
}

import React from 'react'
import ShareLayout from './common/share-layout'
import { heading1, heading2, heading3, satoshiText } from './common/styles'

interface TotalTransactionsProps {
  transactions: number
}

export default function TotalTransactions({
  transactions = 12482
}: TotalTransactionsProps) {
  return (
    <ShareLayout backgroundColor="#F3E1FC">
      <p style={heading1}>My interchain</p>
      <p style={heading2}>transactions</p>
      <p style={heading3}>in 2023</p>
      <p
        style={{
          ...satoshiText,
          color: '#722397',
          fontSize: '15rem',
          letterSpacing: '-1.5rem',
          whiteSpace: 'wrap'
        }}
      >
        {transactions.toLocaleString(undefined, {
          notation: transactions > 10000 ? 'compact' : 'standard'
        })}
      </p>
      <p
        style={{
          ...satoshiText,
          color: '#8B45AC',
          fontSize: '4rem',
          fontWeight: 500,
          marginTop: '1.5rem',
          letterSpacing: '0.375rem'
        }}
      >
        to be exact!
      </p>
    </ShareLayout>
  )
}

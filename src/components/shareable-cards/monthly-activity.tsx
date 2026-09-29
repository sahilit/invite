import React from 'react'
import ShareLayout from './common/share-layout'
import { heading1, heading2, heading3, satoshiText } from './common/styles'

interface MonthlyActivityProps {
  month: string
  transactions: number
}

export default function MonthlyActivity({
  month,
  transactions
}: MonthlyActivityProps) {
  return (
    <ShareLayout backgroundColor="#F3E1FC">
      <p style={heading1}>My most</p>
      <p style={heading2}>active month</p>
      <p style={heading3}>in 2023</p>
      <p
        style={{
          ...satoshiText,
          color: '#722397',
          fontSize: '8.75rem',
          letterSpacing: '-0.875rem'
        }}
      >
        {month}
      </p>
      <div
        style={{
          ...satoshiText,
          display: 'flex',
          flexDirection: 'column',
          color: '#8B45AC',
          fontSize: '4rem',
          fontWeight: 500,
          marginTop: '1.5rem',
          letterSpacing: '0.375rem',
          whiteSpace: 'wrap'
        }}
      >
        <span>
          I did <strong>{transactions.toLocaleString()}</strong>
        </span>
        <span>transactions</span>
      </div>
    </ShareLayout>
  )
}

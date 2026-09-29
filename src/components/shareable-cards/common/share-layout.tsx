import React from 'react'
import LeapBranding from './leap-branding'

interface ShareLayoutProps {
  children: React.ReactNode
  backgroundColor: string
}

export default function ShareLayout({
  children,
  backgroundColor
}: ShareLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        height: 900,
        width: 1200
      }}
    >
      <div
        style={{
          width: 770,
          height: 900,
          backgroundColor,
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '5rem',
          paddingRight: '5rem',
          alignItems: 'stretch',
          justifyContent: 'center'
        }}
      >
        {children}
      </div>
      <LeapBranding />
    </div>
  )
}

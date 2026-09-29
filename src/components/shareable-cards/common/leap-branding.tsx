import React from 'react'
import { satoshiText, holidayText } from '../common/styles'

export default function LeapBranding() {
  return (
    <div
      style={{
        width: 430,
        height: 900,
        backgroundColor: '#D4F5D9',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src="https://assets.leapwallet.io/wrapped-images/bg-welcome.svg"
        alt="bg"
        style={{
          width: 430,
          height: 900,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />
      <img
        src="https://assets.leapwallet.io/wrapped-images/big-logo.svg"
        alt="leap-logo"
        style={{
          width: '193px',
          height: '55px'
        }}
      />
      <h1
        style={{
          ...holidayText,
          color: '#074810',
          textAlign: 'center',
          fontSize: '5.36rem',
          letterSpacing: '-0.26rem',
          marginTop: '2rem'
        }}
      >
        My Cosmos Wrapped &apos;23
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '3.5rem'
        }}
      >
        <p
          style={{
            ...satoshiText,
            fontSize: '1.5rem',
            color: '#555555',
            textAlign: 'center'
          }}
        >
          check yours on
        </p>
        <p
          style={{
            ...satoshiText,
            fontSize: '1.75rem',
            color: '#222222',
            textAlign: 'center',
            marginTop: '-0.25rem'
          }}
        >
          leapboard.app/wrapped
        </p>
      </div>
    </div>
  )
}

import React from 'react'
import ShareLayout from './common/share-layout'
import { heading1, heading2, holidayText, satoshiText } from './common/styles'

interface ReviewProps {
  characterUrl: string
  characterName: string
  totalTransactions: number
  mostActiveMonth: string
  chainsCount: number
  topChainName: string
  proposalVotedOn: number
  nftsBought: number
}

interface DataDisplayProps {
  values: string
  type: string
  valuesColor: string
  typeColor: string
  style?: React.CSSProperties
}

interface BoxProps {
  children: React.ReactNode
  borderColor: string
  backGroundColor: string
  style?: any
}

const Box = ({ children, borderColor, backGroundColor, style }: BoxProps) => (
  <div
    style={{
      display: 'flex',
      borderRadius: '1.25rem',
      border: `1px solid ${borderColor}`,
      backgroundColor: backGroundColor,
      padding: '1rem',
      marginBottom: '1rem',
      ...style
    }}
  >
    {children}
  </div>
)

const DataDisplay = ({
  values,
  type,
  valuesColor,
  typeColor,
  style
}: DataDisplayProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      ...style
    }}
  >
    <p
      style={{
        ...satoshiText,
        fontSize: '3.75rem',
        letterSpacing: '-0.34rem',
        color: valuesColor,
        lineHeight: '50%'
      }}
    >
      {values}
    </p>
    <p
      style={{
        ...satoshiText,
        fontSize: '0.95rem',
        fontWeight: 500,
        letterSpacing: '0.08rem',
        color: typeColor,
        lineHeight: '50%'
      }}
    >
      {type}
    </p>
  </div>
)

export default function Review({
  characterUrl,
  characterName,
  totalTransactions,
  mostActiveMonth,
  chainsCount,
  topChainName,
  proposalVotedOn,
  nftsBought
}: ReviewProps) {
  return (
    <ShareLayout backgroundColor="#E1FBDA">
      <div
        style={{
          display: 'flex',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div
            style={{
              ...heading1,
              fontSize: '2.25rem',
              letterSpacing: '-0.07rem',
              lineHeight: '117%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <span>This is</span>
            <span>everything I did</span>
          </div>
          <div
            style={{
              ...heading2,
              color: '#21BB36',
              fontSize: '6.25rem',
              letterSpacing: '-0.32rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <span>on Cosmos</span>
            <span
              style={{
                marginTop: '-0.5rem'
              }}
            >
              in 2023
            </span>
          </div>
        </div>
        <div
          style={{
            borderRadius: '1.2rem',
            width: 240,
            height: 240,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '0.75rem 1.5rem '
          }}
        >
          <img
            src={characterUrl}
            style={{
              borderRadius: '1.2rem',
              width: 240,
              height: 240,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1
            }}
          />
          <p
            style={{
              ...holidayText,
              color: '#ffffff',
              fontSize: '2.25rem',
              fontWeight: 500,
              textAlign: 'center',
              backdropFilter: 'blur(6px)',
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
              borderRadius: '1.2rem'
            }}
          >
            {characterName}
          </p>
        </div>
      </div>
      <Box
        borderColor={'#8B45AC'}
        backGroundColor={'#F3E0FC'}
        style={{
          gap: '1rem',
          width: '100%',
          marginTop: '1rem'
        }}
      >
        <DataDisplay
          values={totalTransactions.toLocaleString(undefined, {
            notation: totalTransactions > 10000 ? 'compact' : 'standard'
          })}
          type="transactions"
          valuesColor="#722397"
          typeColor="#8B45AC"
          style={{
            flex: 4
          }}
        />
        <DataDisplay
          style={{
            flex: 7
          }}
          values={mostActiveMonth}
          type="most active month"
          valuesColor="#722397"
          typeColor="#8B45AC"
        />
      </Box>
      <Box
        borderColor={'#D08787'}
        backGroundColor={'#FBDADA'}
        style={{
          gap: '1rem',
          width: '100%'
        }}
      >
        <DataDisplay
          style={{
            flex: 4
          }}
          values={chainsCount.toString()}
          type="IBC chains explored"
          valuesColor="#D85C41"
          typeColor="#D08787"
        />
        <DataDisplay
          style={{
            flex: 7
          }}
          values={topChainName}
          type="my top chain"
          valuesColor="#D85C41"
          typeColor="#D08787"
        />
      </Box>
      <div
        style={{
          width: '100%',
          display: 'flex',
          gap: '1rem'
        }}
      >
        <Box borderColor={'#AEA957'} backGroundColor={'#FBF9DA'}>
          <DataDisplay
            values={proposalVotedOn.toString()}
            type="governance proposals voted"
            valuesColor="#CDA20B"
            typeColor="#AEA957"
          />
        </Box>
        <Box
          borderColor={'#AEA957'}
          backGroundColor={'#FBF9DA'}
          style={{ flex: 1 }}
        >
          <DataDisplay
            values={nftsBought.toString()}
            type="NFTs bought on Stargaze"
            valuesColor="#CDA20B"
            typeColor="#AEA957"
          />
        </Box>
      </div>
    </ShareLayout>
  )
}

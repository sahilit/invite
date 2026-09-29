import React from 'react'
import ShareLayout from './common/share-layout'
import { heading1, heading2, heading3, satoshiText } from './common/styles'

interface NFTProps {
  nftsCountNumber: number
  mostExpensiveNFTPrice: number
  nftUrl: string | undefined
}

export default function NFT({
  nftsCountNumber,
  mostExpensiveNFTPrice,
  nftUrl
}: NFTProps) {
  const head1 =
    mostExpensiveNFTPrice > 2500
      ? 'This was my'
      : nftsCountNumber > 0
      ? 'I purchased'
      : 'I did not purchase'

  const head2 =
    mostExpensiveNFTPrice > 2500
      ? 'priciest NFT'
      : nftsCountNumber > 0
      ? '8 NFTs'
      : 'any NFTs'

  const content =
    mostExpensiveNFTPrice > 2500 ? (
      <>
        bought for&nbsp;
        <span
          style={{
            color: '#9E053D',
            fontWeight: 900
          }}
        >
          {mostExpensiveNFTPrice} STARS
        </span>
        <br />
        on Stargaze
      </>
    ) : (
      'on Stargaze'
    )

  return (
    <ShareLayout backgroundColor="#FBDADA">
      <p style={heading1}>{head1}</p>
      <p
        style={{
          ...satoshiText,
          ...heading2,
          color: '#9E053D'
        }}
      >
        {head2}
      </p>
      <p
        style={{
          ...satoshiText,
          ...heading3,
          fontSize: '2rem',
          fontWeight: 500,
          marginTop: '1.5rem',
          lineHeight: '112%',
          letterSpacing: 'normal',
          marginBottom: 0
        }}
      >
        {content}
      </p>
      <img
        src={
          nftsCountNumber > 0
            ? nftUrl
            : 'https://assets.leapwallet.io/wrapped-images/sad-frog.jpg'
        }
        style={{
          width: 420,
          height: 420,
          marginTop: '2.5rem',
          borderRadius: '1.8rem'
        }}
      />
    </ShareLayout>
  )
}

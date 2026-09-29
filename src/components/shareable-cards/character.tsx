import React from 'react'
import ShareLayout from './common/share-layout'
import { heading1, heading2 } from './common/styles'

interface CharacterProps {
  characterName: string
  characterImage: string
}

export default function Character({
  characterName,
  characterImage
}: CharacterProps) {
  return (
    <ShareLayout backgroundColor="#E1FBDA">
      <p style={heading1}>My Cosmos Character</p>
      <p
        style={{
          ...heading2,
          color: '#21BB36',
          marginTop: '1rem',
          lineHeight: '70%'
        }}
      >
        {characterName}
      </p>
      <img
        src={characterImage}
        style={{
          width: 420,
          height: 420,
          marginTop: '3rem',
          borderRadius: '1.8rem'
        }}
      />
    </ShareLayout>
  )
}

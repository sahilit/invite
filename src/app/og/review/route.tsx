import Review from '@/components/shareable-cards/review'
import { getUserStats } from '@/data/load-stats'
import chainsData from '@/data/chains.json'
import { ImageResponse } from 'next/og'
import { z } from 'zod'
import { characterInfo } from '@/data/character'
import { ChainData, getFonts, getMonthFromNumber } from '@/utils'
import { UserStats } from '@/atoms/user-stats'
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge'

// const key = crypto.subtle.importKey(
//   'raw',
//   new TextEncoder().encode('my_secret'),
//   { name: 'HMAC', hash: { name: 'SHA-256' } },
//   false,
//   ['sign']
// )

const addressValidator = z.string().startsWith('cosmos')

// function toHex(arrayBuffer: ArrayBuffer) {
//   return Array.prototype.map
//     .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
//     .join('')
// }

function convertFirebaseObject(obj: any): any {
  let result: any = {}

  for (const key in obj) {
    if (obj[key].hasOwnProperty('integerValue')) {
      result[key] = parseInt(obj[key].integerValue)
    } else if (obj[key].hasOwnProperty('stringValue')) {
      result[key] = obj[key].stringValue
    } else if (obj[key].hasOwnProperty('mapValue')) {
      result[key] = convertFirebaseObject(obj[key].mapValue.fields)
    }
  }

  return result
}

const getData = async (cosmosAddress: string) => {
  const payload = {
    documents: [
      `projects/leap-393508/databases/(default)/documents/wrapped_2023/${cosmosAddress}`
    ]
  }
  const result = await fetch(
    'https://firestore.googleapis.com/v1/projects/leap-393508/databases/(default)/documents:batchGet',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  )
  const [entry] = await result.json()
  if (entry.found) {
    return convertFirebaseObject(entry.found.fields)
  } else {
    return null
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const address = url.searchParams.get('cosmosAddress')

  // const verifyData = toHex(
  //   await crypto.subtle.sign(
  //     'HMAC',
  //     await key,
  //     new TextEncoder().encode(JSON.stringify({ data }))
  //   )
  // )

  // if (verifyData !== token) {
  //   return new Response('Unauthorized', { status: 401 })
  // }

  const result = addressValidator.safeParse(address)

  if (!result.success) {
    return new Response('Bad Request', { status: 400 })
  }

  const results = (await getData(result.data)) as UserStats

  if (!results) {
    return new Response('Not Found', { status: 404 })
  }

  const fonts = await getFonts()

  const characterData = characterInfo[results.cosmos_character]
  const totalTransactions = results.total_txns
  const chainsCount = results.chains.chains_count
  const proposalVotedOn = results.governance_proposals.voted_on
  const nftsBought = results.nfts.bought

  const [topChainId] = Object.entries(results.chains.txns_by_chain).sort(
    (a, b) => {
      return b[1] - a[1]
    }
  )[0]

  const topChainData = chainsData[
    topChainId as keyof typeof chainsData
  ] as ChainData

  const mostActiveMonth = Object.entries(results.months.txns_by_month)
    .map(([num, txnCount]) => {
      const month = getMonthFromNumber(num)
      return {
        month,
        txnCount
      }
    })
    .sort((a, b) => {
      return b.txnCount - a.txnCount
    })[0]

  return new ImageResponse(
    (
      <Review
        characterUrl={characterData.smallImage}
        characterName={characterData.name}
        totalTransactions={totalTransactions}
        mostActiveMonth={mostActiveMonth.month.long}
        chainsCount={chainsCount}
        topChainName={topChainData.chainName}
        proposalVotedOn={proposalVotedOn}
        nftsBought={nftsBought}
      />
    ),
    {
      width: 1200,
      height: 900,
      fonts: [
        {
          name: 'Satoshi',
          data: fonts.satoshiRegular,
          weight: 400,
          style: 'normal'
        },
        {
          name: 'Satoshi',
          data: fonts.satoshiMedium,
          weight: 500,
          style: 'normal'
        },
        {
          name: 'Satoshi',
          data: fonts.satoshiBold,
          weight: 700,
          style: 'normal'
        },
        {
          name: 'Greatest Holiday',
          data: fonts.greatestHolidayRegular,
          weight: 400,
          style: 'normal'
        }
      ]
    }
  )
}

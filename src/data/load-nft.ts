const STARGAZE_API_URL = 'https://graphql.mainnet.stargaze-apis.com/graphql'

type StargazeTokenMetadata = {
  name: string
  media: {
    url: string
  }
}

const tokenQuery = `
query Token($collectionAddr: String!, $tokenId: String!) {
  token(collectionAddr: $collectionAddr, tokenId: $tokenId) {
    name
    media {
      url
    }
  }
}
`

export const getNFTMetadata = async (
  collectionAddr: string,
  token_id: string
): Promise<StargazeTokenMetadata> => {
  const response = await fetch(STARGAZE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: tokenQuery,
      variables: {
        collectionAddr,
        tokenId: token_id
      }
    })
  })
  if (response.ok) {
    const { data } = await response.json()
    return data.token as StargazeTokenMetadata
  }
  throw new Error('Failed to fetch token metadata')
}

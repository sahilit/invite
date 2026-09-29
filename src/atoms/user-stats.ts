import { atom, useAtomValue } from 'jotai'

export enum CosmosCharacter {
  COSMOS_CADET = 'cosmos cadet',
  COSMOS_KIDDO = 'cosmos kiddo',
  CHAIN_CONNOISSEUR = 'chain connoisseur',
  GOVERNANCE_GANGSTA = 'governance gangsta',
  NFT_ENTHUSIAST = 'nft enthusiast',
  COSMOS_CAPTAIN = 'cosmos captain'
}

export type TxnsByMonth = Record<
  '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12',
  number
>

export type UserStats = {
  address: string
  total_txns: number
  months: {
    most_active_month: number
    txns_by_month: TxnsByMonth
  }
  chains: {
    chains_count: number
    ibc_transfers: number
    txns_by_chain: {
      [key: string]: number
    }
  }
  governance_proposals: {
    voted_on: 153
    voted_on_chains: 13
    highest_proposals_voted_chain?: string
  }
  nfts: {
    bought: number
    priciest?: {
      collection_id: string
      token_id: string
      price: number
    }
  }
  // value from enum CosmosCharacter
  cosmos_character: CosmosCharacter
}

type UserStatsAtom =
  | {
      status: 'idle' | 'loading'
    }
  | {
      status: 'success'
      data: UserStats | null
    }
  | {
      status: 'error'
      error: Error
    }

export const userStatsAtom = atom<UserStatsAtom>({
  status: 'idle'
})

export const useUserStats = () => {
  return useAtomValue(userStatsAtom)
}

import { useUserStats } from '@/atoms/user-stats'
import { getNFTMetadata } from '@/data/load-nft'
import useSWR from 'swr'

export const useNFTImageUrl = () => {
  const userStats = useUserStats()

  return useSWR(
    userStats.status === 'success' && !!userStats.data?.nfts.priciest
      ? `nft-image:${userStats.data.nfts.priciest.collection_id}:${userStats.data.nfts.priciest.token_id}`
      : null,
    async () => {
      if (userStats.status !== 'success' || !userStats.data?.nfts.priciest) {
        throw new Error('User stats not loaded')
      }

      const {
        nfts: {
          priciest: { collection_id: collectionId, token_id: tokenId }
        }
      } = userStats.data

      return getNFTMetadata(collectionId, tokenId)
    },
    {
      dedupingInterval: 1000 * 60 * 60 * 24, // 1 day
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnReconnect: true
    }
  )
}

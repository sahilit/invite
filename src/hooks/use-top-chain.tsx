import { useChains } from '@/atoms/chains'
import { useUserStats } from '@/atoms/user-stats'

export const useTopChain = () => {
  const chains = useChains()
  const stats = useUserStats()

  if (stats.status !== 'success' || !stats.data) {
    return undefined
  }

  const [topChainId, topChainTransactions] = Object.entries(
    stats.data.chains.txns_by_chain ?? {}
  ).sort((a, b) => {
    return b[1] - a[1]
  })[0]

  const topChainData = chains[topChainId]

  return {
    topChainData,
    topChainTransactions
  }
}

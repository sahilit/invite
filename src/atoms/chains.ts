import { atom, useAtomValue } from 'jotai'
import chains from '@/data/chains.json'
import { useMemo } from 'react'

type ChainData = {
  chainId: string
  chainName: string
  icon: string
  baseDenom: string
  addressPrefix: string
  chainRegistryPath: string
}

export const chainsAtom = atom<Record<string, ChainData>>(chains)

export const useChains = () => {
  return useAtomValue(chainsAtom)
}

export const useChainsList = () => {
  const chains = useChains()
  return useMemo(
    () =>
      Object.values(chains).sort((a, b) =>
        a.chainName.localeCompare(b.chainName)
      ),
    [chains]
  )
}

export const useChain = (chainId: string) => {
  const chains = useChains()
  return chains[chainId]
}

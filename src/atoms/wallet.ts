import { atom, useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { z } from 'zod'
import { UserStats, userStatsAtom } from './user-stats'
import { getUserStats } from '@/data/load-stats'
import { useRouter } from 'next/navigation'
import { useClearHistory } from './controller'

type Wallet =
  | {
      status: 'idle' | 'loading' | 'disconnected'
    }
  | {
      status: 'connected'
      cosmosAddress: string
    }

export const walletAtom = atom<Wallet>({
  status: 'idle'
})

export const useWallet = () => {
  return useAtomValue(walletAtom)
}

export const useConnectWallet = () => {
  const [wallet, setWallet] = useAtom(walletAtom)
  const { replace, prefetch } = useRouter()

  const connectWallet = useCallback(() => {
    if (wallet.status === 'connected' || wallet.status === 'loading') {
      return
    }

    // if not in an iframe, do nothing
    // when not in an iframe, window.parent is the same as window
    if (window.parent === window) {
      replace('/wallet')
      return
    }

    window.parent.postMessage(
      {
        type: 'connectWallet'
      },
      '*'
    )

    setWallet({
      status: 'loading'
    })
  }, [replace, setWallet, wallet.status])

  useEffect(() => {
    prefetch('/wallet')
  }, [prefetch])

  return connectWallet
}

export const useDisconnectWallet = () => {
  const clearHistory = useClearHistory()
  const [wallet, setWallet] = useAtom(walletAtom)

  const disconnectWallet = useCallback(() => {
    if (wallet.status === 'disconnected') {
      return
    }

    window.parent.postMessage(
      {
        type: 'disconnectWallet'
      },
      '*'
    )

    clearHistory()
    setWallet({
      status: 'disconnected'
    })
  }, [clearHistory, setWallet, wallet.status])

  return disconnectWallet
}

const responseValidator = z.object({
  type: z.union([
    z.literal('getWalletAddressResponse'),
    z.literal('connectWalletResponse')
  ]),
  data: z
    .object({
      cosmosAddress: z.string().startsWith('cosmos')
    })
    .nullable()
})

type UserStatsSWRKey = `userStats:${string}`

export const useWalletHandler = () => {
  const [wallet, setWallet] = useAtom(walletAtom)
  const [userStats, setUserStats] = useAtom(userStatsAtom)

  const swrKey: UserStatsSWRKey | null =
    wallet.status === 'connected' ? `userStats:${wallet.cosmosAddress}` : null

  const { data, isLoading, error } = useSWR<
    UserStats | null,
    unknown,
    UserStatsSWRKey | null
  >(
    swrKey,
    async (key: UserStatsSWRKey) => {
      const [, address] = key.split(':')
      const returnValue = await getUserStats(address)
      if (!returnValue) {
        return null
      }
      return {
        ...returnValue,
        address
      }
    },
    {
      refreshWhenOffline: true,
      revalidateOnReconnect: true,
      refreshWhenHidden: false,
      revalidateIfStale: false,
      revalidateOnFocus: false
    }
  )

  const { mutate } = useSWRConfig()

  const handleRefetchUserState = useCallback(() => {
    if (swrKey) {
      mutate(swrKey)
    }
  }, [mutate, swrKey])

  useEffect(() => {
    if (wallet.status !== 'connected') {
      setUserStats({
        status: 'idle'
      })
      return
    }
    if (isLoading) {
      setUserStats({
        status: 'loading'
      })
      return
    }
    if (error) {
      setUserStats({
        status: 'error',
        error: new Error('Failed to fetch user stats')
      })
      return
    }
    if (data !== undefined) {
      setUserStats({
        status: 'success',
        data
      })
    }
  }, [data, error, isLoading, setUserStats, userStats.status, wallet.status])

  useEffect(() => {
    // only do this when not in an iframe
    if (window.parent !== window) {
      return
    }
    /**
     * Get address from url search params
     */
    const cosmosAddress = new URLSearchParams(window.location.search).get(
      'cosmosAddress'
    )
    if (cosmosAddress) {
      setWallet({
        status: 'connected',
        cosmosAddress
      })
    }
  }, [setWallet])

  useEffect(() => {
    // if not in an iframe, do nothing
    // when not in an iframe, window.parent is the same as window
    if (window.parent === window) {
      return
    }

    const handleMessage = (event: MessageEvent<unknown>) => {
      const { data } = event

      const result = responseValidator.safeParse(data)

      if (!result.success) {
        return
      }

      const parsedData = result.data

      switch (parsedData.type) {
        case 'connectWalletResponse':
        case 'getWalletAddressResponse': {
          if (parsedData.data === null) {
            // if data is null, we are disconnected
            setWallet({
              status: 'disconnected'
            })
          } else {
            // if data is not null, we are connected
            setWallet({
              status: 'connected',
              cosmosAddress: parsedData.data.cosmosAddress
            })
          }
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [setWallet])

  const returnValue = useMemo(() => {
    return {
      refetchUserStats: handleRefetchUserState
    } as const
  }, [handleRefetchUserState])

  return returnValue
}

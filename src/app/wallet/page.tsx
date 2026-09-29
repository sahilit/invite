'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SpinnerGap } from '@phosphor-icons/react'

const Wallet = () => {
  const [cosmosAddress, setCosmosAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { push, prefetch } = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    setError('')
    e.preventDefault()
    const cleanAddress = cosmosAddress.trim()
    if (!cleanAddress.trim() || !cleanAddress.startsWith('cosmos')) {
      setError('Invalid address')
      setLoading(false)
    } else {
      push(`/?cosmosAddress=${cosmosAddress}`)
      setLoading(false)
    }
  }

  useEffect(() => {
    prefetch('/')
  }, [prefetch])

  return (
    <div className="h-[100svh] w-[100svw] flex items-center justify-center">
      <form
        className="bg-[#FBF9DA] p-6 rounded-2xl flex flex-col items-start w-[20rem] max-w-[100svw]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-sans text-xl text-black font-bold">
          Enter Cosmos Address
        </h1>
        <input
          type="text"
          placeholder="cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh"
          className="w-full mt-4 p-2 rounded-lg bg-[#FBF9DA] border border-[#CDA20B] text-sm text-green-900 placeholder:text-green-900/40"
          value={cosmosAddress}
          onChange={(e) => setCosmosAddress(e.target.value)}
        />
        {error ? <p className="text-red-400 mt-2 text-sm">{error}</p> : null}
        <button
          type="submit"
          className="px-4 py-2 mt-4 w-full text-2xl font-script bg-green-600 text-white rounded-xl shadow disabled:grayscale"
        >
          {loading ? <SpinnerGap className="animate-spin" /> : 'View Wrapped'}
        </button>
      </form>
    </div>
  )
}

export default Wallet

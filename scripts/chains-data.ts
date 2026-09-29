/**
 * Run this script to update chains.json
 *
 * Go to project root and run:
 *
 * npx tsx scripts/chains-data.ts -p tsconfig.json
 */

import { writeFile } from 'fs/promises'
import path from 'path'

const list = [
  'axelar-dojo-1',
  'celestia',
  'comdex-1',
  'cosmoshub-4',
  'crescent-1',
  'dydx-mainnet-1',
  'juno-1',
  'kaiyo-1',
  'mars-1',
  'migaloo-1',
  'neutron-1',
  'noble-1',
  'osmosis-1',
  'quasar-1',
  'quicksilver-2',
  'pacific-1',
  'stargaze-1',
  'stride-1',
  'umee-1'
]

const fn = async () => {
  const res = await fetch(
    `https://assets.leapwallet.io/cosmos-registry/v1/elements-data/chains.json`
  )
  const data = await res.json()
  const filteredChains = data
    .filter((chain: any) => list.includes(chain.chainId))
    .map((chain: any) => {
      return {
        chainId: chain.chainId,
        chainName: chain.chainName,
        icon: chain.icon,
        baseDenom: chain.baseDenom,
        addressPrefix: chain.addressPrefix,
        chainRegistryPath: chain.chainRegistryPath
      }
    })
  const chainsDataRecord = filteredChains.reduce((acc: any, chain: any) => {
    acc[chain.chainId] = chain
    return acc
  }, {})
  console.log(`Found ${filteredChains.length} chains`)
  await writeFile(
    path.join(__dirname, '../src/data/chains.json'),
    JSON.stringify(chainsDataRecord, null, 2)
  )
}

fn()
  .then(() => {
    console.log('done')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

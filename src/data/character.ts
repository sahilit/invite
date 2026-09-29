import { CosmosCharacter } from '@/atoms/user-stats'

export const characterInfo: Record<
  CosmosCharacter,
  {
    name: string
    image: string
    smallImage: string
    description: string
  }
> = {
  [CosmosCharacter.COSMOS_KIDDO]: {
    name: 'Cosmos Cadet',
    image: 'https://assets.leapwallet.io/cosmos-characters/cosmos-kiddo.webp',
    smallImage:
      'https://assets.leapwallet.io/cosmos-characters/840x840/cosmos-kiddo.jpg',
    description:
      "A whole new world awaits you on the interchain. Can't wait to see what you explore next!"
  },
  [CosmosCharacter.COSMOS_CADET]: {
    name: 'Cosmos Cadet',
    image: 'https://assets.leapwallet.io/cosmos-characters/cosmos-kiddo.webp',
    smallImage:
      'https://assets.leapwallet.io/cosmos-characters/840x840/cosmos-kiddo.jpg',
    description:
      "A whole new world awaits you on the interchain. Can't wait to see what you explore next!"
  },
  [CosmosCharacter.CHAIN_CONNOISSEUR]: {
    name: 'Chain Connoisseur',
    image:
      'https://assets.leapwallet.io/cosmos-characters/chain-connoisseur.webp',
    smallImage:
      'https://assets.leapwallet.io/cosmos-characters/840x840/chain-connoisseur.jpg',
    description:
      'You can be trusted to know everything about every new project, as soon as it goes live!'
  },
  [CosmosCharacter.GOVERNANCE_GANGSTA]: {
    name: 'Governance Gangsta',
    image:
      'https://assets.leapwallet.io/cosmos-characters/governance-gangsta.webp',
    smallImage:
      'https://assets.leapwallet.io/cosmos-characters/840x840/governance-gangsta.jpg',
    description:
      "You're always the first to cast your vote. And we're pretty sure you tell everyone else to vote too!"
  },
  [CosmosCharacter.NFT_ENTHUSIAST]: {
    name: 'NFT nthusiast',
    image: 'https://assets.leapwallet.io/cosmos-characters/nft-enthusiast.webp',
    smallImage:
      'https://assets.leapwallet.io/cosmos-characters/840x840/nft-enthusiast.jpg',
    description:
      "You don't care who's making them, you just know you want the art. Here's to your growing collection!"
  },
  [CosmosCharacter.COSMOS_CAPTAIN]: {
    name: 'Cosmos Captain',
    image: 'https://assets.leapwallet.io/cosmos-characters/cosmos-captain.webp',
    smallImage:
      'https://assets.leapwallet.io/cosmos-characters/840x840/cosmos-captain.jpg',
    description:
      'You do a little of this, a little of that, and a little of everything else too! Keep exploring the interchain, no niches necessary.'
  }
}

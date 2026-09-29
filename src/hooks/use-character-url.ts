import { useUserStats } from '@/atoms/user-stats'
import { characterInfo } from '@/data/character'

export const useCharacterSmallUrl = () => {
  const userStats = useUserStats()

  if (userStats.status !== 'success' || !userStats.data) {
    return undefined
  }

  const { cosmos_character: cosmosCharacter } = userStats.data

  const characterData = characterInfo[cosmosCharacter]

  return characterData?.smallImage
}

export const useCharacterUrl = () => {
  const userStats = useUserStats()

  if (userStats.status !== 'success' || !userStats.data) {
    return undefined
  }

  const { cosmos_character: cosmosCharacter } = userStats.data

  const characterData = characterInfo[cosmosCharacter]

  return characterData?.image
}

export const useCharacterName = () => {
  const userStats = useUserStats()

  if (userStats.status !== 'success' || !userStats.data) {
    return undefined
  }

  const { cosmos_character: cosmosCharacter } = userStats.data

  const characterData = characterInfo[cosmosCharacter]

  return characterData?.name
}

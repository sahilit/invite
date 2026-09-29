import { doc, getDoc } from 'firebase/firestore/lite'
import firestore from './firestore'
import { UserStats } from '@/atoms/user-stats'

export const getUserStats = async (cosmosAddress: string) => {
  const docRef = doc(firestore, `/wrapped_2023/${cosmosAddress}`)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as UserStats
  }
  return null
}

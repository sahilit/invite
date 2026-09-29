import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'

export enum FlowStep {
  WELCOME = 0,
  TOTAL_TRANSACTIONS = 1,
  MONTHLY_ACTIVITY = 2,
  EXPLORING_INTERCHAIN = 3,
  LOVED_CHAIN = 4,
  GOVERNANCE = 5,
  NFT = 6,
  FinalReveal = 7,
  CharacterWelcome = 8,
  DownloadApp = 9,
  RevealCharacter = 10,
  Character = 11,
  Summary = 12
}

// small case separated by hyphen
export const FlowStepLabels: Record<FlowStep, string> = {
  [FlowStep.WELCOME]: 'welcome',
  [FlowStep.TOTAL_TRANSACTIONS]: 'total-transactions',
  [FlowStep.MONTHLY_ACTIVITY]: 'monthly-activity',
  [FlowStep.EXPLORING_INTERCHAIN]: 'exploring-interchain',
  [FlowStep.LOVED_CHAIN]: 'loved-chain',
  [FlowStep.GOVERNANCE]: 'governance',
  [FlowStep.NFT]: 'nft',
  [FlowStep.FinalReveal]: 'final-reveal',
  [FlowStep.CharacterWelcome]: 'character-welcome',
  [FlowStep.DownloadApp]: 'download-app',
  [FlowStep.RevealCharacter]: 'reveal-character',
  [FlowStep.Character]: 'cosmos-character',
  [FlowStep.Summary]: 'summary'
}

export const flowStepAtom = atom<FlowStep>(FlowStep.WELCOME)

export const flowStepHistoryAtom = atom<FlowStep[]>([])

export const useIsFirstVisitToWelcome = () => {
  const stepHistory = useAtomValue(flowStepHistoryAtom)

  return !stepHistory.includes(FlowStep.WELCOME)
}

export const useFlowStep = () => {
  return useAtomValue(flowStepAtom)
}

export const useClearHistory = () => {
  const setFlowStepHistory = useSetAtom(flowStepHistoryAtom)

  const clearHistory = useCallback(() => {
    setFlowStepHistory([])
  }, [setFlowStepHistory])

  return clearHistory
}

export const useGoToFirstCard = () => {
  const setFlowStep = useSetAtom(flowStepAtom)
  const setFlowStepHistory = useSetAtom(flowStepHistoryAtom)

  const goToFirstCard = useCallback(() => {
    setFlowStep(FlowStep.WELCOME)
    setFlowStepHistory((h) => [...h, FlowStep.WELCOME])
  }, [setFlowStep, setFlowStepHistory])

  return goToFirstCard
}

export const useResetToWelcomeCard = () => {
  const setFlowStep = useSetAtom(flowStepAtom)
  const setFlowStepHistory = useSetAtom(flowStepHistoryAtom)

  const goToWelcomeCard = useCallback(() => {
    setFlowStep(FlowStep.WELCOME)
    setFlowStepHistory([])
  }, [setFlowStep, setFlowStepHistory])

  return goToWelcomeCard
}

export const totalSteps = Object.keys(FlowStep).length / 2 - 1

export const useGoToNextCard = () => {
  const setFlowStep = useSetAtom(flowStepAtom)
  const setFlowStepHistory = useSetAtom(flowStepHistoryAtom)

  const nextStep = useCallback(() => {
    setFlowStep((step) => {
      if (step === totalSteps) {
        return step
      } else {
        const newStep = step + 1
        if (newStep === FlowStep.DownloadApp && 'leap' in window) {
          setFlowStepHistory((history) => [...history, newStep])
          return newStep + 1
        } else {
          setFlowStepHistory((history) => [...history, step])
          return step + 1
        }
      }
    })
  }, [setFlowStep, setFlowStepHistory])

  return nextStep
}

export const useGoToPreviousCard = () => {
  const setFlowStep = useSetAtom(flowStepAtom)
  const setFlowStepHistory = useSetAtom(flowStepHistoryAtom)

  const previousStep = useCallback(() => {
    setFlowStep((step) => {
      if (step === 0) {
        return step
      } else {
        const newStep = step - 1
        if (newStep === FlowStep.DownloadApp && 'leap' in window) {
          setFlowStepHistory((history) => [...history, newStep])
          return newStep - 1
        } else {
          setFlowStepHistory((history) => [...history, step])
          return step - 1
        }
      }
    })
  }, [setFlowStep, setFlowStepHistory])

  return previousStep
}

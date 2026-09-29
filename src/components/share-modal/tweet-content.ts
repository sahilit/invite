import { FlowStep } from '@/atoms/controller'

const wrapTweet = (text: string) => {
  return `${text}\n\n#CosmosWrapped23 by @leap_cosmos, check it out!\n\n🐸⚛️🌯`
}

export const getTweetContent = (flowStep: FlowStep) => {
  switch (flowStep) {
    case FlowStep.TOTAL_TRANSACTIONS:
      return wrapTweet('This is how many transactions I did this year!')
    case FlowStep.MONTHLY_ACTIVITY:
      return wrapTweet('My most active month in 2023, what was yours?')
    case FlowStep.EXPLORING_INTERCHAIN:
      return wrapTweet(
        'These were the Cosmos chains I explored in 2023. Show me yours?'
      )
    case FlowStep.LOVED_CHAIN:
      return wrapTweet('My top chain in 2023. Pretty crazy, right?')
    case FlowStep.GOVERNANCE:
      return wrapTweet(
        'This was my voting activity in 2023. How many proposals did you vote on?'
      )
    case FlowStep.NFT:
      return wrapTweet(
        'This was my most expensive NFT, purchased on Stargaze. What did your NFT activity look like?'
      )
    case FlowStep.Character:
      return 'I am a Cosmos Cadet!\n\nReveal your Cosmos Character on #CosmosWrapped23 by @leap_cosmos \n\n🐸 ⚛️ 🌯'
    case FlowStep.Summary:
    default:
      return wrapTweet(
        `Here's everything I did on the interchain in 2023 🤯\n\nShow me yours!`
      )
  }
}

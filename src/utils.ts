export const getMonthFromNumber = (num: number | string) => {
  const numValue = Number(num)

  if (numValue < 1 || numValue > 12 || isNaN(numValue)) {
    throw new Error('Invalid month number')
  }

  const months = [
    {
      short: 'Jan' as const,
      long: 'January' as const
    },
    {
      short: 'Feb' as const,
      long: 'February' as const
    },
    {
      short: 'Mar' as const,
      long: 'March' as const
    },
    {
      short: 'Apr' as const,
      long: 'April' as const
    },
    {
      short: 'May' as const,
      long: 'May' as const
    },
    {
      short: 'Jun' as const,
      long: 'June' as const
    },
    {
      short: 'Jul' as const,
      long: 'July' as const
    },
    {
      short: 'Aug' as const,
      long: 'August' as const
    },
    {
      short: 'Sep' as const,
      long: 'September' as const
    },
    {
      short: 'Oct' as const,
      long: 'October' as const
    },
    {
      short: 'Nov' as const,
      long: 'November' as const
    },
    {
      short: 'Dec' as const,
      long: 'December' as const
    }
  ]

  return months[numValue - 1]
}

export type ChainData = {
  chainId: string
  chainName: string
  icon: string
  baseDenom: string
  addressPrefix: string
  chainRegistryPath: string
}

export const sliceAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}

const getFont = (url: URL) => {
  return fetch(url.toString()).then((res) => res.arrayBuffer())
}

type FontDefinition = {
  url: URL
}

const satoshiRegular: FontDefinition = {
  url: new URL('./fonts/satoshi/Satoshi-Regular.otf', import.meta.url)
}

const satoshiMedium: FontDefinition = {
  url: new URL('./fonts/satoshi/Satoshi-Medium.otf', import.meta.url)
}

const satoshiBold: FontDefinition = {
  url: new URL('./fonts/satoshi/Satoshi-Bold.otf', import.meta.url)
}

const greatestHolidayRegular: FontDefinition = {
  url: new URL(
    './fonts/greatest-holiday/Greatest-Holiday-Regular.otf',
    import.meta.url
  )
}

export const getFonts = async () => {
  const [
    satoshiRegularAB,
    satoshiMediumAB,
    satoshiBoldAB,
    greatestHolidayRegularAB
  ] = await Promise.all([
    getFont(satoshiRegular.url),
    getFont(satoshiMedium.url),
    getFont(satoshiBold.url),
    getFont(greatestHolidayRegular.url)
  ])
  return {
    satoshiRegular: satoshiRegularAB,
    satoshiMedium: satoshiMediumAB,
    satoshiBold: satoshiBoldAB,
    greatestHolidayRegular: greatestHolidayRegularAB
  }
}

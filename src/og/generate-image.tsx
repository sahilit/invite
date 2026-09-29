import type { ReactElement } from 'react'
import { ImageResponse } from 'next/og'

const getFont = (url: string) => {
  return fetch(new URL(url)).then((res) => res.arrayBuffer())
}

type FontDefinition = {
  url: string
}

const satoshiRegular: FontDefinition = {
  url: import.meta.resolve(`@/fonts/satoshi/Satoshi-Regular.otf`)
}

const satoshiMedium: FontDefinition = {
  url: import.meta.resolve(`@/fonts/satoshi/Satoshi-Medium.otf`)
}

const satoshiBold: FontDefinition = {
  url: import.meta.resolve(`@/fonts/satoshi/Satoshi-Bold.otf`)
}

const greatestHolidayRegular: FontDefinition = {
  url: import.meta.resolve(
    `@/fonts/greatest-holiday/Greatest-Holiday-Regular.otf`
  )
}

const getFonts = async () => {
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

export const generateImage = async (component: ReactElement) => {
  const { satoshiRegular, satoshiMedium, satoshiBold, greatestHolidayRegular } =
    await getFonts()

  return new ImageResponse(component, {
    width: 1200,
    height: 900,
    fonts: [
      {
        name: 'Satoshi',
        data: satoshiRegular,
        weight: 400,
        style: 'normal'
      },
      {
        name: 'Satoshi',
        data: satoshiMedium,
        weight: 500,
        style: 'normal'
      },
      {
        name: 'Satoshi',
        data: satoshiBold,
        weight: 700,
        style: 'normal'
      },
      {
        name: 'Greatest Holiday',
        data: greatestHolidayRegular,
        weight: 400,
        style: 'normal'
      }
    ]
  })
}

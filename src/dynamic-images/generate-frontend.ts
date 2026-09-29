'use client'

import satori from 'satori'
import { get, set } from 'idb-keyval'

// name-weight-style
type FontId = `${string}-${number}-${'normal' | 'italic'}`

class FontRegistry {
  async get(font: FontDefinition) {
    const cached = await get<ArrayBuffer>(font.id)
    if (cached) {
      return cached
    } else {
      const response = await fetch(font.url)
      const arrayBuffer = await response.arrayBuffer()
      await set(font.id, arrayBuffer)
      return arrayBuffer
    }
  }
}

const fontRegistry = new FontRegistry()

type FontDefinition = {
  id: FontId
  url: string
}

const satoshiRegular: FontDefinition = {
  id: `Satoshi-400-normal`,
  url: `https://assets.leapwallet.io/fonts/Satoshi-Regular.otf`
}

const satoshiMedium: FontDefinition = {
  id: `Satoshi-500-normal`,
  url: `https://assets.leapwallet.io/fonts/Satoshi-Medium.otf`
}

const satoshiBold: FontDefinition = {
  id: `Satoshi-700-normal`,
  url: `https://assets.leapwallet.io/fonts/Satoshi-Bold.otf`
}

const greatestHolidayRegular: FontDefinition = {
  id: `GreatestHoliday-400-normal`,
  url: `https://assets.leapwallet.io/fonts/Greatest+Holiday+Regular.otf`
}

export const generateImage = async (element: React.ReactElement) => {
  const satoshiRegularArrayBuffer = await fontRegistry.get(satoshiRegular)
  const satoshiBoldArrayBuffer = await fontRegistry.get(satoshiBold)
  const satoshiMediumArrayBuffer = await fontRegistry.get(satoshiMedium)
  const greatestHolidayRegularArrayBuffer = await fontRegistry.get(
    greatestHolidayRegular
  )

  const svg = await satori(element, {
    width: 1200,
    height: 900,
    fonts: [
      {
        name: 'Satoshi',
        data: satoshiRegularArrayBuffer,
        weight: 400,
        style: 'normal'
      },
      {
        name: 'Satoshi',
        data: satoshiMediumArrayBuffer,
        weight: 500,
        style: 'normal'
      },
      {
        name: 'Satoshi',
        data: satoshiBoldArrayBuffer,
        weight: 700,
        style: 'normal'
      },
      {
        name: 'Greatest Holiday',
        data: greatestHolidayRegularArrayBuffer,
        weight: 400,
        style: 'normal'
      }
    ]
  })

  return svg
}

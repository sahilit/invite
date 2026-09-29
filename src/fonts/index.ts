import Font from 'next/font/local'

export const Satoshi = Font({
  src: [
    {
      path: './satoshi/Satoshi-Regular.otf',
      style: 'normal',
      weight: '400'
    },
    {
      path: './satoshi/Satoshi-Medium.otf',
      style: 'normal',
      weight: '500'
    },
    {
      path: './satoshi/Satoshi-Bold.otf',
      style: 'normal',
      weight: '700'
    }
  ],
  variable: '--font-satoshi',
  display: 'swap'
})

export const GreatestHoliday = Font({
  src: [
    {
      path: './greatest-holiday/Greatest-Holiday-Regular.otf',
      style: 'normal',
      weight: '400'
    }
  ],
  variable: '--font-greatest-holiday',
  display: 'block'
})

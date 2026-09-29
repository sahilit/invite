import type { Metadata } from 'next'
import { GreatestHoliday, Satoshi } from '@/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: `Cosmos Wrapped '23 | by Leap Wallet`,
  description: 'Your cosmos interchain experience for 2023 wrapped up!'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${Satoshi.variable} ${GreatestHoliday.variable}`}
    >
      <body
        style={{
          background: 'url(/background.svg), #222',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          overflow: 'hidden',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {children}
      </body>
    </html>
  )
}

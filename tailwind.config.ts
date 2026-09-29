import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px'
      },
      fontFamily: {
        sans: ['var(--font-satoshi)', ...fontFamily.sans],
        script: ['var(--font-greatest-holiday)']
      }
    }
  },
  plugins: []
}

export default config

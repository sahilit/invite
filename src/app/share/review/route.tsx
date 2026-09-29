import { z } from 'zod'

const addressValidator = z.string().startsWith('cosmos')

export async function GET(request: Request) {
  const url = new URL(request.url)
  const origin = url.origin
  const address = url.searchParams.get('cosmosAddress')
  const result = addressValidator.safeParse(address)

  if (!result.success) {
    return new Response('Bad Request', { status: 400 })
  }

  return new Response(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cosmos Wrapped '23 | by Leap Wallet</title>

      <meta property="og:title" content="My Cosmos Wrapped '23" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="${origin}/og/review?cosmosAddress=${address}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="900" />
      <meta property="og:url" content="${origin}/share/review?cosmosAddress=${address}" />
      <meta property="og:locale" content="en_US" />

      <meta property="twitter:site" content="@leap_cosmos" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="My Cosmos Wrapped '23" />
      <meta name="twitter:description" content="Here's what I did on the interchain in 2023" />
      <meta name="twitter:image" content="${origin}/og/review?cosmosAddress=${address}" />
    </head>
    <body style="width: 100svw; height: 100svh; background-color: #222222; display: flex; align-items: center; justify-content: center;">
      <p style="font-size: 1.25rem; color: #eeeeee; font-family: sans-serif;">Cosmos Wrapped '23</p>
    </body>
    </html>
  `,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html'
      }
    }
  )
}

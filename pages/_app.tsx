import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
      <Analytics />
    </Providers>
  )
}

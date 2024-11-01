import '../globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import {VisualEditing} from 'next-sanity'
import {Inter} from 'next/font/google'
import {draftMode} from 'next/headers'
import {SanityLive} from '@/sanity/lib/live'

import AlertBanner from './alert-banner'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled} = await draftMode()
  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body className="min-h-screen">
        {isEnabled && <AlertBanner />}
        {children}
        {isEnabled && <VisualEditing />}
        <SanityLive />
        <SpeedInsights />
      </body>
    </html>
  )
}

import '../globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import {VisualEditing} from 'next-sanity'
import {Inter} from 'next/font/google'
import {draftMode} from 'next/headers'

import AlertBanner from './alert-banner'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body className="min-h-screen">
        {draftMode().isEnabled && <AlertBanner />}
        {children}
        {draftMode().isEnabled && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  )
}

import '../globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {VisualEditing, toPlainText, type PortableTextBlock} from 'next-sanity'
import {Inter} from 'next/font/google'
import {draftMode} from 'next/headers'
import {Suspense} from 'react'

import DateComponent from './date'
import AlertBanner from './alert-banner'

import type {SettingsQueryResult} from '@/sanity.types'
import {sanityFetch} from '@/sanity/lib/fetch'
import {settingsQuery} from '@/sanity/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Are We React 19 Yet? No (0% tests passing)`,
  }
}

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

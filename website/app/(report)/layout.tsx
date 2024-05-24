import '../globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {VisualEditing} from 'next-sanity'
import {Inter} from 'next/font/google'
import {draftMode} from 'next/headers'

import AlertBanner from './alert-banner'

import {sanityFetch} from '@/sanity/lib/fetch'
import {reportQuery} from '@/sanity/lib/queries'
import type {ReportQueryResult} from '@/sanity.types'

export async function generateMetadata(): Promise<Metadata> {
  const report = await sanityFetch<ReportQueryResult>({query: reportQuery})
  console.log({report})
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

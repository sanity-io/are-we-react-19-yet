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
  const [report] = await sanityFetch<ReportQueryResult>({
    query: reportQuery,
    stega: false,
    perspective: 'published',
    lastLiveEventId: undefined,
  })
  let title = 'Are We React 19 Yet?'
  if (report && report.total > 0) {
    title +=
      report.passing === report.total
        ? ' ✨ YES ✨'
        : ` No (${Math.floor((report.passing / report.total) * 100)}% complete)`
  }
  return {title}
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

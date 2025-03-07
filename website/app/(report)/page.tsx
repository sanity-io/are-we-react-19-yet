import type {Metadata} from 'next'

import {reportQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

import Report from './Report'
import {Footer} from './Footer'

export async function generateMetadata(): Promise<Metadata> {
  const {data: report} = await sanityFetch({
    query: reportQuery,
    stega: false,
  })
  let title = 'Are We React 19 Yet?'
  if (report && report.total > 0) {
    const percentage = Math.floor((report.passing / report.total) * 100)
    title +=
      report.passing === report.total
        ? ' ✨ YES ✨'
        : percentage > 95
          ? ` 🤏 Almost (${percentage}% complete)`
          : ` No (${percentage}% complete)`
  }
  return {title}
}

export default async function Page() {
  const {data: report} = await sanityFetch({query: reportQuery})
  return (
    <>
      <main className="container mx-auto px-5">
        <section className="mt-16 mb-16 flex flex-col items-center lg:mb-12 lg:flex-row lg:justify-between">
          <h1 className="text-center text-6xl leading-tight font-bold tracking-tighter lg:pr-8 lg:text-8xl">
            <span className="block text-sm leading-none tracking-normal">Are We React 19 Yet?</span>
            {report && report.total > 0 && report.passing === report.total
              ? ' ✨ YES ✨'
              : Math.floor((report.passing / report.total) * 100) > 95
                ? '🤏'
                : 'No'}
          </h1>
          {report && report.total > 0 && (
            <h2 className="mt-5 text-center text-lg text-pretty lg:pl-8 lg:text-left">
              {report.passing} of {report.total} tests are passing (
              {`${Math.floor((report.passing / report.total) * 100)}%`})
            </h2>
          )}
        </section>
        {report?.test && <Report test={report.test} />}
      </main>
      {report?.updatedAt && <Footer dateString={report.updatedAt} />}
    </>
  )
}

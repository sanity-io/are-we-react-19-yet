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
    title +=
      report.passing === report.total
        ? ' ✨ YES ✨'
        : ` No (${Math.floor((report.passing / report.total) * 100)}% complete)`
  }
  return {title}
}

export default async function Page() {
  const {data: report} = await sanityFetch({query: reportQuery})
  return (
    <>
      <main className="container mx-auto px-5">
        <section className="mb-16 mt-16 flex flex-col items-center lg:mb-12 lg:flex-row lg:justify-between">
          <h1 className="text-center text-6xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-8xl">
            <span className="block text-sm leading-none tracking-normal">Are We React 19 Yet?</span>
            {report && report.total > 0 && report.passing === report.total ? ' ✨ YES ✨' : 'No'}
          </h1>
          {report && report.total > 0 && (
            <h2 className="mt-5 text-pretty text-center text-lg lg:pl-8 lg:text-left">
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

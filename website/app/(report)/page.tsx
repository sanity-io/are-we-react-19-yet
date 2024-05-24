import type {ReportQueryResult} from '@/sanity.types'
import {reportQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/fetch'

import DateComponent from './date'

export default async function Page({
  searchParams: {lastLiveEventId},
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) {
  const [report, LiveSubscription] = await sanityFetch<ReportQueryResult>({
    query: reportQuery,
    lastLiveEventId,
  })
  console.log({report}, report?.test)
  return (
    <>
      <main className="container mx-auto px-5">
        <section className="mb-16 mt-16 flex flex-col items-center lg:mb-12 lg:flex-row lg:justify-between">
          <h1 className="text-balance text-6xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-8xl">
            {report && report.total > 0 && report.passing === report.total ? ' ✨ YES ✨' : 'No'}
          </h1>
          {report && report.total > 0 && (
            <h2 className="mt-5 text-pretty text-center text-lg lg:pl-8 lg:text-left">
              {report.passing} of {report.total} tests are passing (
              {`${Math.floor((report.passing / report.total) * 100)}%`})
            </h2>
          )}
        </section>
        {report?.test.map((test) => {
          return (
            <a
              key={test._key}
              href={test.name ? `https://npmjs.com/package/${test.name}` : undefined}
            >
              {test.name || 'No name'}
            </a>
          )
        })}
      </main>
      {report?._createdAt && (
        <footer className="container mx-auto px-5">
          <p className="text-muted text-center text-sm">
            Last update: <DateComponent dateString={report._createdAt} />
          </p>
        </footer>
      )}
      <LiveSubscription />
    </>
  )
}

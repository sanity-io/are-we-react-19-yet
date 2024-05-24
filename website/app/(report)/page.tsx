import {CheckmarkCircleIcon, CloseCircleIcon} from '@sanity/icons'

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
        <section className="grid grid-cols-1 gap-4 bg-slate-50 p-4 text-sm leading-6 sm:grid-cols-2 sm:px-8 sm:pb-8 sm:pt-6 lg:grid-cols-1 lg:p-4 xl:grid-cols-2 xl:px-8 xl:pb-8 xl:pt-6">
          {report?.test.map((test) => {
            return (
              <a
                key={test._key}
                className="g-blue-500 group relative rounded-md bg-white p-3 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-blue-500"
                rel="noreferrer noopener"
                target="_blank"
                href={test.name ? `https://npmjs.com/package/${test.name}` : undefined}
              >
                <span
                  className={`absolute right-1.5 top-1.5 -z-0 scale-150 text-4xl opacity-25 ${test.pass ? 'text-green-800' : 'text-red-800'}`}
                >
                  {test.pass ? <CheckmarkCircleIcon /> : <CloseCircleIcon />}
                </span>
                <span className="relative z-10">{test.name || 'No name'}</span>
              </a>
            )
          })}
        </section>
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

import {CheckmarkCircleIcon, CloseCircleIcon} from '@sanity/icons'
import {stegaClean} from '@sanity/client/stega'
import {Code} from 'bright'
import {notFound, redirect} from 'next/navigation'
import type {Metadata} from 'next'
import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/fetch'
import {packageQuery} from '@/sanity/lib/queries'
import type {PackageQueryResult} from '@/sanity.types'

import {Footer} from '../../Footer'

Code.theme = 'github-dark-dimmed'

export async function generateMetadata({
  params,
  searchParams: {lastLiveEventId},
}: {
  params: {name: string[]}
  searchParams: {[key: string]: string | string[] | undefined}
}): Promise<Metadata> {
  const [maybeOrg, maybeName] = params.name
  const packageName = maybeName ? `${decodeURIComponent(maybeOrg)}/${maybeName}` : maybeOrg
  const [report] = await sanityFetch<PackageQueryResult>({
    query: packageQuery,
    params: {name: packageName},
    stega: false,
    lastLiveEventId,
  })
  let title = 'Are We React 19 Yet?'
  if (report?.package?.name && report?.package?.version) {
    title = `${report.package.name}@${report.package.version}`
  }
  return {title}
}

export default async function PackageReport({
  params,
  searchParams: {lastLiveEventId},
}: {
  params: {name: string[]}
  searchParams: {[key: string]: string | string[] | undefined}
}) {
  const [maybeOrg, maybeName, ...invalid] = params.name

  if (invalid.length > 0) {
    redirect(`/package/${decodeURIComponent(maybeOrg)}/${maybeName}`)
  }

  const packageName = maybeName ? `${decodeURIComponent(maybeOrg)}/${maybeName}` : maybeOrg
  const [report, LiveSubscription] = await sanityFetch<PackageQueryResult>({
    query: packageQuery,
    params: {name: packageName},
    lastLiveEventId,
  })
  if (!report?.package) {
    notFound()
  }
  if (!report.package.name) {
    throw new Error('No package name')
  }
  if (!report.package.version) {
    throw new Error('No package version')
  }

  return (
    <>
      <Link className="sticky left-2 top-2 rounded bg-white px-2 py-1" href="/">
        Back
      </Link>
      <main className="container mx-auto px-5">
        <section className="mb-8 mt-16 flex flex-col items-center">
          <h1 className="text-balance text-2xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-4xl">
            {report.package.name}@{report.package.version}
          </h1>
          <h2 className="relative mt-5 text-pretty text-center text-lg">
            <span
              className={`absolute -left-0.5 -top-1 -z-0 text-4xl ${report.package.pass ? 'text-green-800' : 'text-red-800'}`}
            >
              {report.package.pass ? <CheckmarkCircleIcon /> : <CloseCircleIcon />}
            </span>
            <span className="relative z-10 ml-1 pl-8">
              {report.package.pass ? 'Passing' : 'Failing'}
            </span>
          </h2>
          <a
            className="mt-5 text-blue-600 hover:underline"
            rel="noreferrer noopener"
            target="_blank"
            href={stegaClean(
              `https://npmjs.com/package/${report.package.name}/v/${report.package.version}`,
            )}
          >
            View npm
          </a>
        </section>
        {!report.package.pass && report.package.log && (
          <Code lang="zsh">{`pnpm install --resolution-only
WARN Issues with peer dependencies found
${report.package.log}`}</Code>
        )}
        {report.package.testJson && (
          <Code lang="json" title="package.json">
            {report.package.testJson}
          </Code>
        )}
      </main>
      {report?.updatedAt && <Footer dateString={report.updatedAt} />}
      <LiveSubscription />
    </>
  )
}

import {CheckmarkCircleIcon, CloseCircleIcon} from '@sanity/icons'
import {stegaClean} from '@sanity/client/stega'
import {Code} from 'bright'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/fetch'
import {packageQuery} from '@/sanity/lib/queries'
import type {PackageQueryResult} from '@/sanity.types'

import {Footer} from '../Footer'

Code.theme = 'github-dark-dimmed'

export async function generateSharedMetadata({
  name,
  lastLiveEventId,
}: {
  name: string
  lastLiveEventId: string | string[] | null | undefined
}): Promise<Metadata> {
  const [report] = await sanityFetch<PackageQueryResult>({
    query: packageQuery,
    params: {name},
    stega: false,
    lastLiveEventId,
  })
  let title = 'Are We React 19 Yet?'
  if (report?.package?.name && report?.package?.version) {
    title = `${report.package.name}@${report.package.version}`
  }
  return {title}
}

export async function SharedPackageReport({
  name,
  lastLiveEventId,
}: {
  name: string
  lastLiveEventId: string | string[] | null | undefined
}) {
  const [report, LiveSubscription] = await sanityFetch<PackageQueryResult>({
    query: packageQuery,
    params: {name},
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
      <Link
        className="sticky left-2 top-2 rounded bg-white px-2 py-1"
        href={{
          pathname: '/',
          query: {lastLiveEventId},
        }}
      >
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

export function Favicon({pass}: {pass: boolean}) {
  return (
    <svg
      style={{
        background: pass ? 'rgb(22,101,52)' : 'rgb(153,27,27)',
        borderRadius: '50%',
      }}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {pass ? (
        <path
          d="M5.5 11.5L10.5 16.5L19.5 7.60001"
          stroke="#fff"
          stroke-width="1.2"
          stroke-linejoin="round"
        />
      ) : (
        <path d="M18 7L7 18M7 7L18 18" stroke="#fff" stroke-width="1.2" stroke-linejoin="round" />
      )}
    </svg>
  )
}

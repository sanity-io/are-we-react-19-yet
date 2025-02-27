import {CheckmarkCircleIcon, CloseCircleIcon} from '@sanity/icons'
import {stegaClean} from 'next-sanity'
import {Code} from 'bright'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {packageQuery} from '@/sanity/lib/queries'

import {Footer} from '../Footer'

Code.theme = 'github-dark-dimmed'

export async function generateSharedMetadata({name}: {name: string}): Promise<Metadata> {
  const {data: report} = await sanityFetch({
    query: packageQuery,
    params: {name},
    stega: false,
  })
  let title = 'Are We React 19 Yet?'
  if (report?.package?.name && report?.package?.version) {
    title = `${report.package.name}@${report.package.version}`
  }
  return {title}
}

export async function SharedPackageReport({name}: {name: string}) {
  const {data: report} = await sanityFetch({
    query: packageQuery,
    params: {name},
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
      <Link className="sticky top-2 left-2 rounded-sm bg-white px-2 py-1" href="/">
        Back
      </Link>
      <main className="container mx-auto px-5">
        <section className="mt-16 mb-8 flex flex-col items-center">
          <h1 className="text-2xl leading-tight font-bold tracking-tighter text-balance lg:pr-8 lg:text-4xl">
            {report.package.name}@{report.package.version}
          </h1>
          <h2 className="relative mt-5 text-center text-lg text-pretty">
            <span
              className={`absolute -top-1 -left-0.5 -z-0 text-4xl ${report.package.pass ? 'text-green-800' : 'text-red-800'}`}
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
    </>
  )
}

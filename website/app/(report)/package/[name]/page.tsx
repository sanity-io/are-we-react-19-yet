import type {Metadata} from 'next'

import {SharedPackageReport, generateSharedMetadata} from '../Shared'
import {sanityFetch} from '@/sanity/lib/live'
import {packageNamesQuery} from '@/sanity/lib/queries'

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: packageNamesQuery,
    stega: false,
    perspective: 'published',
  })
  return (
    data
      ?.filter((name) => typeof name === 'string' && !name.includes('/'))
      .map((name) => ({name})) ?? []
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{name: string}>
}): Promise<Metadata> {
  const {name} = await params
  return generateSharedMetadata({name})
}

export default async function PackageReport({params}: {params: Promise<{name: string}>}) {
  const {name} = await params
  return <SharedPackageReport name={name} />
}

import type {Metadata} from 'next'

import {SharedPackageReport, generateSharedMetadata} from '../../Shared'
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
      ?.filter((name) => typeof name === 'string' && name.includes('/'))
      .map((key) => {
        if (typeof key !== 'string') return null
        const [scoped, name] = key.split('/')
        return {scoped, name}
      }) ?? []
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{name: string; scoped: string}>
}): Promise<Metadata> {
  const {name, scoped} = await params
  return generateSharedMetadata({
    name: `${decodeURIComponent(name)}/${scoped}`,
  })
}

export default async function PackageReport({
  params,
}: {
  params: Promise<{name: string; scoped: string}>
}) {
  const {name, scoped} = await params
  return <SharedPackageReport name={`${decodeURIComponent(name)}/${scoped}`} />
}

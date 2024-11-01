import type {Metadata} from 'next'

import {SharedPackageReport, generateSharedMetadata} from '../../Shared'

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

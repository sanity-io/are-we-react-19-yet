import type {Metadata} from 'next'

import {SharedPackageReport, generateSharedMetadata} from '../../Shared'

export async function generateMetadata({
  params,
  searchParams: {lastLiveEventId},
}: {
  params: {name: string; scoped: string}
  searchParams: {[key: string]: string | string[] | undefined}
}): Promise<Metadata> {
  return generateSharedMetadata({
    name: `${decodeURIComponent(params.name)}/${params.scoped}`,
    lastLiveEventId,
  })
}

export default async function PackageReport({
  params,
  searchParams: {lastLiveEventId},
}: {
  params: {name: string; scoped: string}
  searchParams: {[key: string]: string | string[] | undefined}
}) {
  return (
    <SharedPackageReport
      name={`${decodeURIComponent(params.name)}/${params.scoped}`}
      lastLiveEventId={lastLiveEventId}
    />
  )
}

import type {Metadata} from 'next'

import {SharedPackageReport, generateSharedMetadata} from '../Shared'

export async function generateMetadata({
  params,
  searchParams: {lastLiveEventId},
}: {
  params: {name: string}
  searchParams: {[key: string]: string | string[] | undefined}
}): Promise<Metadata> {
  return generateSharedMetadata({
    name: params.name,
    lastLiveEventId,
  })
}

export default async function PackageReport({
  params,
  searchParams: {lastLiveEventId},
}: {
  params: {name: string}
  searchParams: {[key: string]: string | string[] | undefined}
}) {
  return <SharedPackageReport name={params.name} lastLiveEventId={lastLiveEventId} />
}

import {ImageResponse} from 'next/og'

import {packageQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/fetch'
import type {PackageQueryResult} from '@/sanity.types'

import {Favicon} from '../Shared'

export const runtime = 'edge'

export const size = {
  width: 25,
  height: 25,
}
export const contentType = 'image/png'

export default async function Icon({params}: {params: {name: string}}) {
  const [report] = await sanityFetch<PackageQueryResult>({
    query: packageQuery,
    params,
    stega: false,
    lastLiveEventId: undefined,
  })

  return new ImageResponse(<Favicon pass={report?.package?.pass ?? false} />, {...size})
}

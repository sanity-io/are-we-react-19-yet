import {ImageResponse} from 'next/og'

import {packageQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

import {Favicon} from '../../../Favicon'

export const runtime = 'edge'

export const size = {
  width: 25,
  height: 25,
}
export const contentType = 'image/png'

export default async function Icon({params}: {params: Promise<{name: string; scoped: string}>}) {
  const {name, scoped} = await params
  const {data: report} = await sanityFetch({
    query: packageQuery,
    params: {name: `${decodeURIComponent(name)}/${scoped}`},
    perspective: 'published',
    stega: false,
  })

  return new ImageResponse(<Favicon pass={report?.package?.pass ?? false} />, {...size})
}

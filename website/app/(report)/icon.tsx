import {ImageResponse} from 'next/og'

import {reportQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

import {Favicon} from './package/Shared'

export const runtime = 'edge'

export const size = {
  width: 25,
  height: 25,
}
export const contentType = 'image/png'

export default async function Icon() {
  const {data} = await sanityFetch({
    query: reportQuery,
    stega: false,
  })
  const passing = (data && data.total > 0 && data.passing === data.total) || false

  return new ImageResponse(<Favicon pass={passing} />, {...size})
}

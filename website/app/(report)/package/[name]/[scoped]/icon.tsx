import {ImageResponse} from 'next/og'

import {packageNamesQuery, packageQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

import {Favicon} from '../../Shared'

// export const runtime = 'edge'

export const size = {
  width: 25,
  height: 25,
}
export const contentType = 'image/png'

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
        const [scope, name] = key.split('/')
        return {scope, name}
      }) ?? []
  )
}

export default async function Icon({params}: {params: Promise<{name: string; scoped: string}>}) {
  const {name, scoped} = await params
  const {data: report} = await sanityFetch({
    query: packageQuery,
    params: {name: `${decodeURIComponent(name)}/${scoped}`},
    stega: false,
  })

  return new ImageResponse(<Favicon pass={report?.package?.pass ?? false} />, {...size})
}

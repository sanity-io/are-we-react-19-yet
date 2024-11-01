import type {Metadata} from 'next'

import {SharedPackageReport, generateSharedMetadata} from '../Shared'

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

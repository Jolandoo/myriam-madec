'use client'

import lazyLoad from 'next/dynamic'
import config from '../../../../sanity.config'

const NextStudioDynamic = lazyLoad(
  () => import('next-sanity/studio').then((mod) => ({ default: mod.NextStudio })),
  { ssr: false }
)

export default function StudioClient() {
  return <NextStudioDynamic config={config} />
}

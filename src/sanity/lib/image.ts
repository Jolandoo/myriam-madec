import imageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder = imageUrlBuilder({ projectId, dataset })

export function urlFor(source: unknown): string {
  if (!source) return ''
  if (typeof source === 'string') return source
  return builder.image(source as Parameters<typeof builder.image>[0]).url()
}

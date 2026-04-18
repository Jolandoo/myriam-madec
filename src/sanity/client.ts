import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

// Client null si les variables d'env Sanity ne sont pas configurées
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

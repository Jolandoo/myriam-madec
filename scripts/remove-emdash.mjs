import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
const env = {}
try {
  readFileSync(envPath, 'utf-8').split('\n').forEach((line) => {
    const [key, ...val] = line.split('=')
    if (key && val.length) env[key.trim()] = val.join('=').trim()
  })
} catch { /* ignore */ }

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  token: env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

function replaceEm(obj) {
  if (typeof obj === 'string') return obj.replaceAll('—', ' - ')
  if (Array.isArray(obj)) return obj.map(replaceEm)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      out[k] = replaceEm(v)
    }
    return out
  }
  return obj
}

const types = ['visite', 'article', 'tarifs', 'pageGuide', 'pagePrivatisation']

let patched = 0
for (const type of types) {
  const docs = await client.fetch(`*[_type == "${type}"]`)
  for (const doc of docs) {
    const cleaned = replaceEm(doc)
    const patches = {}
    let changed = false

    for (const [key, val] of Object.entries(cleaned)) {
      if (key.startsWith('_')) continue
      if (JSON.stringify(val) !== JSON.stringify(doc[key])) {
        patches[key] = val
        changed = true
      }
    }

    if (changed) {
      await client.patch(doc._id).set(patches).commit()
      patched++
      console.log(`  ✓ ${doc._id}`)
    }
  }
}

console.log(`\n✅ Done - ${patched} documents patched`)

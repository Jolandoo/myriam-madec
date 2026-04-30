import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const envFile = readFileSync('.env.local', 'utf-8')
const token = envFile.match(/^SANITY_API_TOKEN=(.+)$/m)?.[1]?.trim()
if (!token) { console.error('SANITY_API_TOKEN not found in .env.local'); process.exit(1) }

const client = createClient({
  projectId: 'ubi26sl9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function uploadFromUrl(url) {
  if (!url || typeof url !== 'string') return null
  try {
    console.log(`  Uploading ${url.slice(0, 80)}...`)
    const res = await fetch(url)
    if (!res.ok) { console.log(`  SKIP (HTTP ${res.status})`); return null }
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const buffer = Buffer.from(await res.arrayBuffer())
    const asset = await client.assets.upload('image', buffer, { contentType })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (e) {
    console.error(`  ERROR uploading ${url}:`, e.message)
    return null
  }
}

async function migrateVisites() {
  const docs = await client.fetch(`*[_type == "visite" || (_id in path("drafts.**") && _type == "visite")]{ _id, image, imageDetail }`)
  for (const doc of docs) {
    const patch = {}
    if (typeof doc.image === 'string') {
      const img = await uploadFromUrl(doc.image)
      if (img) patch.image = img
    }
    if (typeof doc.imageDetail === 'string') {
      const img = await uploadFromUrl(doc.imageDetail)
      if (img) patch.imageDetail = img
    }
    if (Object.keys(patch).length > 0) {
      await client.patch(doc._id).set(patch).commit()
      console.log(`✓ visite ${doc._id}`)
    }
  }
}

async function migrateArticles() {
  const docs = await client.fetch(`*[_type == "article"]{ _id, image, images }`)
  for (const doc of docs) {
    const patch = {}
    if (typeof doc.image === 'string') {
      const img = await uploadFromUrl(doc.image)
      if (img) patch.image = img
    }
    if (Array.isArray(doc.images)) {
      const migrated = []
      let changed = false
      for (const item of doc.images) {
        if (item.src && typeof item.src === 'string') {
          const img = await uploadFromUrl(item.src)
          if (img) { migrated.push({ ...img, alt: item.alt || '' }); changed = true }
        } else {
          migrated.push(item)
        }
      }
      if (changed) patch.images = migrated
    }
    if (Object.keys(patch).length > 0) {
      await client.patch(doc._id).set(patch).commit()
      console.log(`✓ article ${doc._id}`)
    }
  }
}

async function migratePageGuide() {
  const doc = await client.fetch(`*[_type == "pageGuide"][0]{ _id, heroImage, photo }`)
  if (!doc) return
  const patch = {}
  if (typeof doc.heroImage === 'string') {
    const img = await uploadFromUrl(doc.heroImage)
    if (img) patch.heroImage = img
  }
  if (typeof doc.photo === 'string') {
    const img = await uploadFromUrl(doc.photo)
    if (img) patch.photo = img
  }
  if (Object.keys(patch).length > 0) {
    await client.patch(doc._id).set(patch).commit()
    console.log(`✓ pageGuide ${doc._id}`)
  }
}

async function migratePagePrivatisation() {
  const doc = await client.fetch(`*[_type == "pagePrivatisation"][0]{ _id, heroImage, galerie, coupDeCoeurImage }`)
  if (!doc) return
  const patch = {}
  if (typeof doc.heroImage === 'string') {
    const img = await uploadFromUrl(doc.heroImage)
    if (img) patch.heroImage = img
  }
  if (typeof doc.coupDeCoeurImage === 'string') {
    const img = await uploadFromUrl(doc.coupDeCoeurImage)
    if (img) patch.coupDeCoeurImage = img
  }
  if (Array.isArray(doc.galerie)) {
    const migrated = []
    let changed = false
    for (const item of doc.galerie) {
      if (item.src && typeof item.src === 'string') {
        const img = await uploadFromUrl(item.src)
        if (img) { migrated.push({ ...img, alt: item.alt || '' }); changed = true }
      } else {
        migrated.push(item)
      }
    }
    if (changed) patch.galerie = migrated
  }
  if (Object.keys(patch).length > 0) {
    await client.patch(doc._id).set(patch).commit()
    console.log(`✓ pagePrivatisation ${doc._id}`)
  }
}

async function cleanupNulls() {
  const imageFields = {
    visite: ['image', 'imageDetail'],
    article: ['image'],
    pageGuide: ['heroImage', 'photo'],
    pagePrivatisation: ['heroImage', 'coupDeCoeurImage'],
  }
  for (const [type, fields] of Object.entries(imageFields)) {
    const docs = await client.fetch(`*[_type == "${type}"]{ _id, ${fields.join(', ')} }`)
    for (const doc of docs) {
      const unset = fields.filter(f => doc[f] === null || doc[f] === '')
      if (unset.length > 0) {
        await client.patch(doc._id).unset(unset).commit()
        console.log(`  cleaned ${doc._id}: removed ${unset.join(', ')}`)
      }
    }
  }
}

console.log('=== Migration des images vers Sanity assets ===\n')

console.log('--- Visites ---')
await migrateVisites()

console.log('\n--- Articles ---')
await migrateArticles()

console.log('\n--- Page Guide ---')
await migratePageGuide()

console.log('\n--- Page Privatisation ---')
await migratePagePrivatisation()

console.log('\n--- Cleanup null/empty image fields ---')
await cleanupNulls()

console.log('\n=== Migration terminée ===')

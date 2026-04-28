/**
 * Migration i18n — transforme les champs string/text existants en localeString/localeText
 * Déplace les valeurs existantes dans le sous-champ .fr
 * Idempotent : si un champ est déjà un objet avec .fr, il est ignoré
 *
 * Usage : node scripts/migrate-i18n.mjs
 */

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

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token     = env.SANITY_API_TOKEN

if (!projectId) { console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans .env.local'); process.exit(1) }
if (!token)     { console.error('❌  SANITY_API_TOKEN manquant dans .env.local (token avec droits d\'écriture)'); process.exit(1) }

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

function isLocalized(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && 'fr' in value
}

function toLocaleString(value) {
  if (value == null) return undefined
  if (isLocalized(value)) return value
  return { _type: 'localeString', fr: String(value) }
}

function toLocaleText(value) {
  if (value == null) return undefined
  if (isLocalized(value)) return value
  return { _type: 'localeText', fr: String(value) }
}

let migrated = 0
let skipped = 0

async function migrateVisites() {
  const docs = await client.fetch('*[_type == "visite"]')
  console.log(`\n📋 Visites: ${docs.length} documents`)

  for (const doc of docs) {
    const patch = {}
    const fields = {
      titre:            'localeString',
      sousTitre:        'localeString',
      descriptionCourte:'localeString',
      description:      'localeText',
      programme:        'localeText',
    }

    let needsPatch = false
    for (const [field, type] of Object.entries(fields)) {
      if (doc[field] != null && !isLocalized(doc[field])) {
        patch[field] = type === 'localeString' ? toLocaleString(doc[field]) : toLocaleText(doc[field])
        needsPatch = true
      }
    }

    if (needsPatch) {
      await client.patch(doc._id).set(patch).commit()
      console.log(`  ✅ ${doc.titre?.fr ?? doc.titre ?? doc._id}`)
      migrated++
    } else {
      skipped++
    }
  }
}

async function migrateArticles() {
  const docs = await client.fetch('*[_type == "article"]')
  console.log(`\n📋 Articles: ${docs.length} documents`)

  for (const doc of docs) {
    const patch = {}
    let needsPatch = false

    const strFields = ['titre', 'imageAlt']
    const textFields = ['extrait', 'contenu']

    for (const f of strFields) {
      if (doc[f] != null && !isLocalized(doc[f])) {
        patch[f] = toLocaleString(doc[f])
        needsPatch = true
      }
    }
    for (const f of textFields) {
      if (doc[f] != null && !isLocalized(doc[f])) {
        patch[f] = toLocaleText(doc[f])
        needsPatch = true
      }
    }

    if (needsPatch) {
      await client.patch(doc._id).set(patch).commit()
      console.log(`  ✅ ${doc.titre?.fr ?? doc.titre ?? doc._id}`)
      migrated++
    } else {
      skipped++
    }
  }
}

async function migrateTarifs() {
  const doc = await client.fetch('*[_type == "tarifs"][0]')
  if (!doc) { console.log('\n📋 Tarifs: aucun document'); return }
  console.log('\n📋 Tarifs: 1 document')

  const patch = {}
  let needsPatch = false

  if (doc.lignes?.length) {
    const newLignes = doc.lignes.map((item) => ({
      ...item,
      duree: isLocalized(item.duree) ? item.duree : toLocaleString(item.duree),
    }))
    if (doc.lignes.some((item) => !isLocalized(item.duree))) {
      patch.lignes = newLignes
      needsPatch = true
    }
  }

  if (doc.conditions?.length && typeof doc.conditions[0] === 'string') {
    patch.conditions = doc.conditions.map((str, i) => ({
      _key: `cond-${i}`,
      _type: 'localeString',
      fr: str,
    }))
    needsPatch = true
  }

  if (doc.annulation?.length) {
    const newAnnulation = doc.annulation.map((item) => ({
      ...item,
      delai:   isLocalized(item.delai)   ? item.delai   : toLocaleString(item.delai),
      montant: isLocalized(item.montant) ? item.montant : toLocaleString(item.montant),
    }))
    if (doc.annulation.some((item) => !isLocalized(item.delai))) {
      patch.annulation = newAnnulation
      needsPatch = true
    }
  }

  if (doc.note != null && !isLocalized(doc.note)) {
    patch.note = toLocaleString(doc.note)
    needsPatch = true
  }

  if (needsPatch) {
    await client.patch(doc._id).set(patch).commit()
    console.log('  ✅ Tarifs migré')
    migrated++
  } else {
    skipped++
  }
}

async function migratePageGuide() {
  const doc = await client.fetch('*[_type == "pageGuide"][0]')
  if (!doc) { console.log('\n📋 Page Guide: aucun document'); return }
  console.log('\n📋 Page Guide: 1 document')

  const patch = {}
  let needsPatch = false

  for (const f of ['heroTitle', 'heroDescription', 'citation']) {
    if (doc[f] != null && !isLocalized(doc[f])) {
      patch[f] = toLocaleString(doc[f])
      needsPatch = true
    }
  }

  if (doc.bio?.length && typeof doc.bio[0] === 'string') {
    patch.bio = doc.bio.map((str, i) => ({
      _key: `bio-${i}`,
      _type: 'localeText',
      fr: str,
    }))
    needsPatch = true
  }

  if (doc.parcours?.length) {
    const newParcours = doc.parcours.map((item) => ({
      ...item,
      label: isLocalized(item.label) ? item.label : toLocaleString(item.label),
    }))
    if (doc.parcours.some((item) => !isLocalized(item.label))) {
      patch.parcours = newParcours
      needsPatch = true
    }
  }

  if (doc.specialites?.length) {
    const newSpec = doc.specialites.map((item) => ({
      ...item,
      label: isLocalized(item.label) ? item.label : toLocaleString(item.label),
      desc:  isLocalized(item.desc)  ? item.desc  : toLocaleText(item.desc),
    }))
    if (doc.specialites.some((item) => !isLocalized(item.label))) {
      patch.specialites = newSpec
      needsPatch = true
    }
  }

  if (doc.affiliations?.length && typeof doc.affiliations[0] === 'string') {
    patch.affiliations = doc.affiliations.map((str, i) => ({
      _key: `aff-${i}`,
      _type: 'localeString',
      fr: str,
    }))
    needsPatch = true
  }

  if (needsPatch) {
    await client.patch(doc._id).set(patch).commit()
    console.log('  ✅ Page Guide migré')
    migrated++
  } else {
    skipped++
  }
}

async function migratePagePrivatisation() {
  const doc = await client.fetch('*[_type == "pagePrivatisation"][0]')
  if (!doc) { console.log('\n📋 Page Privatisation: aucun document'); return }
  console.log('\n📋 Page Privatisation: 1 document')

  const patch = {}
  let needsPatch = false

  for (const f of ['heroTitle', 'heroDescription', 'coupDeCoeurTitre', 'coupDeCoeurCta']) {
    if (doc[f] != null && !isLocalized(doc[f])) {
      patch[f] = toLocaleString(doc[f])
      needsPatch = true
    }
  }

  if (doc.coupDeCoeurTexte != null && !isLocalized(doc.coupDeCoeurTexte)) {
    patch.coupDeCoeurTexte = toLocaleText(doc.coupDeCoeurTexte)
    needsPatch = true
  }

  if (doc.modes?.length) {
    const newModes = doc.modes.map((item) => ({
      ...item,
      label: isLocalized(item.label) ? item.label : toLocaleString(item.label),
      desc:  isLocalized(item.desc)  ? item.desc  : toLocaleText(item.desc),
    }))
    if (doc.modes.some((item) => !isLocalized(item.label))) {
      patch.modes = newModes
      needsPatch = true
    }
  }

  if (doc.texte?.length && typeof doc.texte[0] === 'string') {
    patch.texte = doc.texte.map((str, i) => ({
      _key: `txt-${i}`,
      _type: 'localeText',
      fr: str,
    }))
    needsPatch = true
  }

  if (needsPatch) {
    await client.patch(doc._id).set(patch).commit()
    console.log('  ✅ Page Privatisation migré')
    migrated++
  } else {
    skipped++
  }
}

async function main() {
  console.log('🔄 Migration i18n — transformation des champs en localeString/localeText')
  console.log(`   Projet: ${projectId} | Dataset: ${dataset}\n`)

  await migrateVisites()
  await migrateArticles()
  await migrateTarifs()
  await migratePageGuide()
  await migratePagePrivatisation()

  console.log(`\n✨ Terminé — ${migrated} documents migrés, ${skipped} déjà à jour`)
}

main().catch((err) => {
  console.error('❌ Erreur:', err.message)
  process.exit(1)
})

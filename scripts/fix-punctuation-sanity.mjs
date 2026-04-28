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

// Each entry: [docId, field path, old substring, new substring]
// Field path uses dot notation; for localeString/Text, specify .fr, .en, .es
const REPLACEMENTS = [
  // ── article-fat-bike-foret-littoral ──
  ['article-fat-bike-foret-littoral', 'contenu.fr', 'autrement  -  à bord', 'autrement, à bord'],
  ['article-fat-bike-foret-littoral', 'contenu.fr', 'locale  -  une immersion', 'locale, une immersion'],
  ['article-fat-bike-foret-littoral', 'contenu.en', 'differently  -  aboard', 'differently, aboard'],
  ['article-fat-bike-foret-littoral', 'contenu.en', 'cabin  -  an immersion', 'cabin, an immersion'],
  ['article-fat-bike-foret-littoral', 'contenu.es', 'manera  -  a bordo', 'manera, a bordo'],
  ['article-fat-bike-foret-littoral', 'contenu.es', 'local  -  una inmersión', 'local, una inmersión'],
  ['article-fat-bike-foret-littoral', 'extrait.fr', 'arcachonnais  -  à bord', 'arcachonnais, à bord'],
  ['article-fat-bike-foret-littoral', 'extrait.en', 'coastline  -  aboard', 'coastline, aboard'],
  ['article-fat-bike-foret-littoral', 'extrait.es', 'Arcachon  -  a bordo', 'Arcachon, a bordo'],

  // ── article-journee-internationale-guides-2021 ──
  ['article-journee-internationale-guides-2021', 'contenu.fr', 'dévouement  -  parce', 'dévouement, parce'],
  ['article-journee-internationale-guides-2021', 'contenu.en', 'dedication  -  because', 'dedication, because'],
  ['article-journee-internationale-guides-2021', 'contenu.es', 'dedicación  -  porque', 'dedicación, porque'],
  ['article-journee-internationale-guides-2021', 'extrait.fr', 'Guides  -  un métier', 'Guides, un métier'],
  ['article-journee-internationale-guides-2021', 'extrait.en', 'Guide Day  -  a profession', 'Guide Day, a profession'],
  ['article-journee-internationale-guides-2021', 'extrait.es', 'Guías  -  una profesión', 'Guías, una profesión'],

  // ── article-journee-internationale-guides-2022 ──
  ['article-journee-internationale-guides-2022', 'extrait.fr', '2022  -  une balade', '2022 : une balade'],
  ['article-journee-internationale-guides-2022', 'extrait.en', '2022  -  a walk', '2022: a walk'],
  ['article-journee-internationale-guides-2022', 'extrait.es', '2022  -  un paseo', '2022: un paseo'],
  ['article-journee-internationale-guides-2022', 'imageAlt.fr', "d'Arcachon  -  Quartier", "d'Arcachon, Quartier"],
  ['article-journee-internationale-guides-2022', 'imageAlt.en', 'Bay  -  Lapin Blanc', 'Bay, Lapin Blanc'],
  ['article-journee-internationale-guides-2022', 'imageAlt.es', 'Arcachon  -  Barrio', 'Arcachon, Barrio'],

  // ── article-visites-2021-histoire-bains-de-mer ──
  ['article-visites-2021-histoire-bains-de-mer', 'contenu.fr', "l'eau  -  comme", "l'eau, comme"],
  ['article-visites-2021-histoire-bains-de-mer', 'contenu.fr', "d'Arcachon  -  05 57", "d'Arcachon, 05 57"],
  ['article-visites-2021-histoire-bains-de-mer', 'contenu.en', 'water  -  as it', 'water, as it'],
  ['article-visites-2021-histoire-bains-de-mer', 'contenu.en', 'Office  -  05 57', 'Office, 05 57'],
  ['article-visites-2021-histoire-bains-de-mer', 'contenu.es', 'agua  -  como', 'agua, como'],
  ['article-visites-2021-histoire-bains-de-mer', 'contenu.es', 'Arcachon  -  05 57', 'Arcachon, 05 57'],
  ['article-visites-2021-histoire-bains-de-mer', 'extrait.fr', "d'Arcachon  -  comment", "d'Arcachon : comment"],
  ['article-visites-2021-histoire-bains-de-mer', 'extrait.en', 'origins  -  how', 'origins: how'],
  ['article-visites-2021-histoire-bains-de-mer', 'extrait.es', 'Arcachon  -  cómo', 'Arcachon: cómo'],
  ['article-visites-2021-histoire-bains-de-mer', 'imageAlt.fr', "d'Arcachon  -  Histoire", "d'Arcachon, Histoire"],
  ['article-visites-2021-histoire-bains-de-mer', 'imageAlt.en', 'seafront  -  History', 'seafront, History'],
  ['article-visites-2021-histoire-bains-de-mer', 'imageAlt.es', 'Arcachon  -  Historia', 'Arcachon, Historia'],

  // ── visite-bunker-502 ──
  ['visite-bunker-502', 'description.fr', "décennies  -  jusqu'en 2015, quand", 'décennies. En 2015, un projet de parking révèle son existence sous'],
  // Actually let me be more precise — replace full context
  ['visite-bunker-502', 'description.en', 'decades  -  until 2015', 'decades. In 2015'],
  ['visite-bunker-502', 'description.es', 'décadas  -  hasta 2015', 'décadas. En 2015'],
  ['visite-bunker-502', 'descriptionCourte.fr', '2015  -  plongez', '2015 : plongez'],
  ['visite-bunker-502', 'descriptionCourte.en', '2015  -  dive', '2015: dive'],
  ['visite-bunker-502', 'descriptionCourte.es', '2015  -  sumérjase', '2015: sumérjase'],

  // ── visite-criee-arcachon ──
  ['visite-criee-arcachon', 'descriptionCourte.fr', 'pêche  -  de la', 'pêche, de la'],
  ['visite-criee-arcachon', 'descriptionCourte.en', 'fishing  -  from', 'fishing, from'],
  ['visite-criee-arcachon', 'descriptionCourte.es', 'pesca  -  de la', 'pesca, de la'],

  // ── visite-decouverte-archeologique ──
  ['visite-decouverte-archeologique', 'description.fr', "petits  -  c'est", "petits, c'est"],
  ['visite-decouverte-archeologique', 'description.en', 'ones  -  it is', 'ones, it is'],
  ['visite-decouverte-archeologique', 'description.es', 'pequeños  -  es', 'pequeños, es'],
  ['visite-decouverte-archeologique', 'descriptionCourte.fr', 'archéologiques  -  et une', 'archéologiques, puis une'],
  ['visite-decouverte-archeologique', 'descriptionCourte.en', 'digs  -  and a', 'digs, and a'],
  ['visite-decouverte-archeologique', 'descriptionCourte.es', 'arqueológicas  -  y un', 'arqueológicas, y un'],

  // ── visite-dune-lever-soleil ──
  ['visite-dune-lever-soleil', 'descriptionCourte.fr', 'silence  -  le lever', 'silence. Le lever'],
  ['visite-dune-lever-soleil', 'descriptionCourte.en', 'silence  -  sunrise', 'silence. Sunrise'],
  ['visite-dune-lever-soleil', 'descriptionCourte.es', 'silencio  -  el amanecer', 'silencio. El amanecer'],

  // ── visite-littoral-velo ──
  ['visite-littoral-velo', 'description.fr', "ambiance  -  c'est", "ambiance, c'est"],
  ['visite-littoral-velo', 'description.en', "atmosphere  -  that's", "atmosphere, that's"],
  ['visite-littoral-velo', 'description.es', 'ambiente  -  por eso', 'ambiente, por eso'],
  ['visite-littoral-velo', 'descriptionCourte.fr', 'Moulleau  -  le littoral', 'Moulleau : le littoral'],
  ['visite-littoral-velo', 'descriptionCourte.en', 'Moulleau  -  the Arcachon', 'Moulleau: the Arcachon'],
  ['visite-littoral-velo', 'descriptionCourte.es', 'Moulleau  -  el litoral', 'Moulleau: el litoral'],

  // ── visite-pres-sales-pied ──
  ['visite-pres-sales-pied', 'descriptionCourte.fr', 'et  -  en option  -  une', 'et, en option, une'],
  ['visite-pres-sales-pied', 'descriptionCourte.en', 'and  -  optionally  -  an', 'and, optionally, an'],
  ['visite-pres-sales-pied', 'descriptionCourte.es', 'y  -  opcionalmente  -  una', 'y, opcionalmente, una'],

  // ── visite-sentier-littoral ──
  ['visite-sentier-littoral', 'descriptionCourte.fr', 'Gujan-Mestras  -  nature', 'Gujan-Mestras : nature'],
  ['visite-sentier-littoral', 'descriptionCourte.en', 'Gujan-Mestras  -  nature', 'Gujan-Mestras: nature'],
  ['visite-sentier-littoral', 'descriptionCourte.es', 'Gujan-Mestras  -  naturaleza', 'Gujan-Mestras: naturaleza'],

  // ── visite-velo-pres-sales ──
  ['visite-velo-pres-sales', 'descriptionCourte.fr', 'électrique  -  avec', 'électrique, avec'],
  ['visite-velo-pres-sales', 'descriptionCourte.en', 'bike  -  with', 'bike, with'],
  ['visite-velo-pres-sales', 'descriptionCourte.es', 'eléctrica  -  con', 'eléctrica, con'],

  // ── visite-balades-bateau ──
  ['visite-balades-bateau', 'descriptionCourte.fr', "d'Arguin  -  le Bassin", "d'Arguin : le Bassin"],
  ['visite-balades-bateau', 'descriptionCourte.en', 'Sandbank  -  the Bay', 'Sandbank: the Bay'],
  ['visite-balades-bateau', 'descriptionCourte.es', 'Arguin  -  la Bahía', 'Arguin: la Bahía'],

  // ── singleton-tarifs ──
  ['singleton-tarifs', 'conditions.3.fr', 'inclus  -  à la charge', 'inclus, à la charge'],
  ['singleton-tarifs', 'conditions.3.en', "included  -  at the client's", "included, at the client's"],
  ['singleton-tarifs', 'conditions.3.es', 'incluidas  -  a cargo', 'incluidas, a cargo'],
]

// Get a nested value by dot-path
function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj)
}

// Set a nested value by dot-path
function setByPath(obj, path, value) {
  const keys = path.split('.')
  const last = keys.pop()
  const parent = keys.reduce((o, k) => o?.[k], obj)
  if (parent && last) parent[last] = value
}

async function main() {
  // Group replacements by document ID
  const byDoc = new Map()
  for (const [docId, fieldPath, oldStr, newStr] of REPLACEMENTS) {
    if (!byDoc.has(docId)) byDoc.set(docId, [])
    byDoc.get(docId).push({ fieldPath, oldStr, newStr })
  }

  let patchedCount = 0
  for (const [docId, replacements] of byDoc) {
    const doc = await client.fetch(`*[_id == $id][0]`, { id: docId })
    if (!doc) {
      console.log(`  ⚠ ${docId} not found, skipping`)
      continue
    }

    const patches = {}
    let changed = false

    for (const { fieldPath, oldStr, newStr } of replacements) {
      const currentValue = getByPath(doc, fieldPath)
      if (typeof currentValue !== 'string') {
        console.log(`  ⚠ ${docId}.${fieldPath} is not a string, skipping`)
        continue
      }

      if (!currentValue.includes(oldStr)) {
        // Already fixed or different content
        continue
      }

      const newValue = currentValue.replace(oldStr, newStr)
      setByPath(doc, fieldPath, newValue)

      // Build the Sanity patch key (top-level field)
      const topField = fieldPath.split('.')[0]
      patches[topField] = doc[topField]
      changed = true
    }

    if (changed) {
      await client.patch(doc._id).set(patches).commit()
      patchedCount++
      console.log(`  ✓ ${docId}`)
    }
  }

  console.log(`\n✅ Done — ${patchedCount} documents patched`)
}

main().catch(console.error)

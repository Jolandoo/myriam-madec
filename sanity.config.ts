import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name:    'myriam-madec',
  title:   'Myriam Madec — Administration du site',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu du site')
          .items([
            /* ── Contenu dynamique ─────────────────────────────────────────── */
            S.listItem()
              .title('Visites guidées')
              .child(S.documentTypeList('visite').title('Visites guidées')),
            S.listItem()
              .title('Actualités')
              .child(S.documentTypeList('article').title('Articles')),

            S.divider(),

            /* ── Pages singletons ──────────────────────────────────────────── */
            S.listItem()
              .title('Tarifs')
              .child(
                S.editor()
                  .title('Tarifs')
                  .schemaType('tarifs')
                  .documentId('singleton-tarifs')
              ),
            S.listItem()
              .title('Votre guide')
              .child(
                S.editor()
                  .title('Votre guide')
                  .schemaType('pageGuide')
                  .documentId('singleton-page-guide')
              ),
            S.listItem()
              .title('Privatisation')
              .child(
                S.editor()
                  .title('Privatisation')
                  .schemaType('pagePrivatisation')
                  .documentId('singleton-page-privatisation')
              ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})

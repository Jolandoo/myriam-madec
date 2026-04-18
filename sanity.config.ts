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
            S.listItem()
              .title('Visites guidées')
              .child(S.documentTypeList('visite').title('Visites guidées')),
            S.listItem()
              .title('Actualités')
              .child(S.documentTypeList('article').title('Articles')),
            S.listItem()
              .title('Tarifs')
              .child(
                S.editor()
                  .title('Tarifs')
                  .schemaType('tarifs')
                  .documentId('singleton-tarifs')
              ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})

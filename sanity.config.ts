import { buildLegacyTheme, defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET!

const theme = buildLegacyTheme({
  '--black':     '#080616',
  '--white':     '#FFFFFF',
  '--gray':      '#6E6E9A',
  '--gray-base': '#6E6E9A',

  '--component-bg':         '#1A1953',
  '--component-text-color': '#FFFFFF',

  '--brand-primary': '#2F2FE4',

  '--default-button-color':         '#FFFFFF',
  '--default-button-primary-color': '#2F2FE4',
  '--default-button-success-color': '#162E93',
  '--default-button-warning-color': '#2F2FE4',
  '--default-button-danger-color':  '#C8102E',

  '--state-info-color':    '#162E93',
  '--state-success-color': '#162E93',
  '--state-warning-color': '#2F2FE4',
  '--state-danger-color':  '#C8102E',

  '--main-navigation-color':           '#080616',
  '--main-navigation-color--inverted': '#FFFFFF',

  '--focus-color': '#2F2FE4',
})

export default defineConfig({
  name:    'myriam-madec',
  title:   'Myriam Madec — Administration du site',
  projectId,
  dataset,
  basePath: '/studio',
  theme,
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

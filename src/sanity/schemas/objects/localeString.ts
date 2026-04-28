import { defineType } from 'sanity'

export default defineType({
  name: 'localeString',
  title: 'Texte localisé',
  type: 'object',
  fieldsets: [
    { name: 'translations', title: 'Traductions', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    { name: 'fr', type: 'string', title: 'Français 🇫🇷' },
    { name: 'en', type: 'string', title: 'English 🇬🇧', fieldset: 'translations' },
    { name: 'es', type: 'string', title: 'Español 🇪🇸', fieldset: 'translations' },
  ],
})

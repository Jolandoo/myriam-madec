import { defineType } from 'sanity'

export default defineType({
  name: 'localeText',
  title: 'Texte long localisé',
  type: 'object',
  fieldsets: [
    { name: 'translations', title: 'Traductions', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    { name: 'fr', type: 'text', title: 'Français 🇫🇷' },
    { name: 'en', type: 'text', title: 'English 🇬🇧', fieldset: 'translations' },
    { name: 'es', type: 'text', title: 'Español 🇪🇸', fieldset: 'translations' },
  ],
})

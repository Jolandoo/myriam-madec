import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article / Actualité',
  type: 'document',
  fields: [
    defineField({ name: 'titre',    title: 'Titre',              type: 'localeString', validation: r => r.required() }),
    defineField({ name: 'slug',     title: 'Slug (URL)',         type: 'slug',   options: { source: 'titre.fr' }, validation: r => r.required() }),
    defineField({ name: 'date',     title: 'Date (ex: 21 mars 2025)', type: 'string' }),
    defineField({ name: 'image',    title: 'Image principale, coller URL', type: 'string' }),
    defineField({ name: 'imageAlt', title: 'Description de l\'image (accessibilité)', type: 'localeString' }),
    defineField({ name: 'extrait',  title: 'Extrait (affiché sur la carte)',   type: 'localeText' }),
    defineField({ name: 'contenu',  title: 'Contenu complet (sauter une ligne entre paragraphes)', type: 'localeText' }),
    defineField({
      name: 'images',
      title: 'Galerie photo (optionnel)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'src', title: 'URL de la photo', type: 'string' },
          { name: 'alt', title: 'Description de la photo', type: 'string' },
        ],
        preview: { select: { title: 'alt', subtitle: 'src' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'titre.fr', subtitle: 'date' },
  },
})

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageGuide',
  title: 'Votre guide',
  type: 'document',
  fields: [
    /* ── Hero ──────────────────────────────────────────────────────────── */
    defineField({ name: 'heroTitle',       title: 'Titre hero',       type: 'localeString' }),
    defineField({ name: 'heroDescription', title: 'Description hero', type: 'localeString' }),
    defineField({ name: 'heroImage',       title: 'Image hero', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImageAlt',    title: 'Alt image hero',   type: 'string' }),

    /* ── Photo principale ───────────────────────────────────────────────── */
    defineField({ name: 'photo',    title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'photoAlt', title: 'Alt photo',     type: 'string' }),

    /* ── Citation ───────────────────────────────────────────────────────── */
    defineField({ name: 'citation', title: 'Citation (entre guillemets)', type: 'localeString' }),

    /* ── Bio ────────────────────────────────────────────────────────────── */
    defineField({
      name: 'bio',
      title: 'Bio (paragraphes)',
      type: 'array',
      of: [{ type: 'localeText' }],
      description: 'Chaque entrée = un paragraphe (FR + EN)',
    }),

    /* ── Parcours ───────────────────────────────────────────────────────── */
    defineField({
      name: 'parcours',
      title: 'Parcours / diplômes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'annee', title: 'Année', type: 'string' },
          { name: 'label', title: 'Description', type: 'localeString' },
        ],
        preview: { select: { title: 'annee', subtitle: 'label.fr' } },
      }],
    }),

    /* ── Spécialités ────────────────────────────────────────────────────── */
    defineField({
      name: 'specialites',
      title: 'Spécialités',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'icone',
            title: 'Icône',
            type: 'string',
            options: {
              list: [
                { title: 'Cœur',        value: 'heart'       },
                { title: 'Diplôme',     value: 'graduation'  },
                { title: 'Globe',       value: 'globe'       },
                { title: 'Récompense', value: 'award'       },
                { title: 'Étoile',     value: 'star'        },
                { title: 'Nature',     value: 'leaf'        },
              ],
            },
          },
          { name: 'label', title: 'Titre',       type: 'localeString' },
          { name: 'desc',  title: 'Description', type: 'localeText' },
        ],
        preview: { select: { title: 'label.fr', subtitle: 'desc.fr' } },
      }],
    }),

    /* ── Affiliations ───────────────────────────────────────────────────── */
    defineField({
      name: 'affiliations',
      title: 'Affiliations professionnelles',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Votre guide' }) },
})

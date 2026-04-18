import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageGuide',
  title: 'Votre guide',
  type: 'document',
  fields: [
    /* ── Hero ──────────────────────────────────────────────────────────── */
    defineField({ name: 'heroTitle',       title: 'Titre hero',       type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Description hero', type: 'string' }),
    defineField({ name: 'heroImage',       title: 'Image hero (URL)', type: 'url'    }),
    defineField({ name: 'heroImageAlt',    title: 'Alt image hero',   type: 'string' }),

    /* ── Photo principale ───────────────────────────────────────────────── */
    defineField({ name: 'photo',    title: 'Photo (URL)',   type: 'url'    }),
    defineField({ name: 'photoAlt', title: 'Alt photo',     type: 'string' }),

    /* ── Citation ───────────────────────────────────────────────────────── */
    defineField({ name: 'citation', title: 'Citation (entre guillemets)', type: 'string' }),

    /* ── Bio ────────────────────────────────────────────────────────────── */
    defineField({
      name: 'bio',
      title: 'Bio (paragraphes)',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'Chaque entrée = un paragraphe',
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
          { name: 'label', title: 'Description', type: 'string' },
        ],
        preview: { select: { title: 'annee', subtitle: 'label' } },
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
          { name: 'label', title: 'Titre',       type: 'string' },
          { name: 'desc',  title: 'Description', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'label', subtitle: 'desc' } },
      }],
    }),

    /* ── Affiliations ───────────────────────────────────────────────────── */
    defineField({
      name: 'affiliations',
      title: 'Affiliations professionnelles',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Votre guide' }) },
})

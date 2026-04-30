import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pagePrivatisation',
  title: 'Privatisation',
  type: 'document',
  fields: [
    /* ── Hero ──────────────────────────────────────────────────────────── */
    defineField({ name: 'heroTitle',       title: 'Titre hero',       type: 'localeString' }),
    defineField({ name: 'heroDescription', title: 'Description hero', type: 'localeString' }),
    defineField({ name: 'heroImage',       title: 'Image hero', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImageAlt',    title: 'Alt image hero',   type: 'string' }),

    /* ── Modes de visite ────────────────────────────────────────────────── */
    defineField({
      name: 'modes',
      title: 'Modes de visite (À vélo, À pied, En bateau…)',
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
                { title: 'Vélo',   value: 'bike'      },
                { title: 'À pied', value: 'footprints' },
                { title: 'Bateau', value: 'sailboat'   },
                { title: 'Voiture', value: 'car'       },
              ],
            },
          },
          { name: 'label', title: 'Titre',       type: 'localeString' },
          { name: 'desc',  title: 'Description', type: 'localeText' },
        ],
        preview: { select: { title: 'label.fr', subtitle: 'desc.fr' } },
      }],
    }),

    /* ── Galerie ────────────────────────────────────────────────────────── */
    defineField({
      name: 'galerie',
      title: 'Galerie photos',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Description', type: 'string' },
        ],
      }],
    }),

    /* ── Texte principal ────────────────────────────────────────────────── */
    defineField({
      name: 'texte',
      title: 'Texte principal (paragraphes)',
      type: 'array',
      of: [{ type: 'localeText' }],
      description: 'Chaque entrée = un paragraphe (FR + EN)',
    }),

    /* ── Coup de cœur ───────────────────────────────────────────────────── */
    defineField({ name: 'coupDeCoeurTitre', title: 'Coup de cœur · Titre',     type: 'localeString' }),
    defineField({ name: 'coupDeCoeurTexte', title: 'Coup de cœur · Texte',     type: 'localeText' }),
    defineField({ name: 'coupDeCoeurImage', title: 'Coup de cœur · Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'coupDeCoeurImageAlt', title: 'Coup de cœur · Alt image', type: 'string' }),
    defineField({ name: 'coupDeCoeurCta',  title: 'Coup de cœur · Texte bouton', type: 'localeString' }),
  ],
  preview: { prepare: () => ({ title: 'Privatisation' }) },
})

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pagePrivatisation',
  title: 'Privatisation',
  type: 'document',
  fields: [
    /* ── Hero ──────────────────────────────────────────────────────────── */
    defineField({ name: 'heroTitle',       title: 'Titre hero',       type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Description hero', type: 'string' }),
    defineField({ name: 'heroImage',       title: 'Image hero (URL)', type: 'url'    }),
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
          { name: 'label', title: 'Titre',       type: 'string' },
          { name: 'desc',  title: 'Description', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'label', subtitle: 'desc' } },
      }],
    }),

    /* ── Galerie ────────────────────────────────────────────────────────── */
    defineField({
      name: 'galerie',
      title: 'Galerie photos',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'src', title: 'URL de la photo', type: 'url'    },
          { name: 'alt', title: 'Description',      type: 'string' },
        ],
        preview: { select: { title: 'alt', subtitle: 'src' } },
      }],
    }),

    /* ── Texte principal ────────────────────────────────────────────────── */
    defineField({
      name: 'texte',
      title: 'Texte principal (paragraphes)',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'Chaque entrée = un paragraphe',
    }),

    /* ── Coup de cœur ───────────────────────────────────────────────────── */
    defineField({ name: 'coupDeCoeurTitre', title: 'Coup de cœur — Titre',     type: 'string' }),
    defineField({ name: 'coupDeCoeurTexte', title: 'Coup de cœur — Texte',     type: 'text', rows: 4 }),
    defineField({ name: 'coupDeCoeurImage', title: 'Coup de cœur — Image (URL)', type: 'url' }),
    defineField({ name: 'coupDeCoeurImageAlt', title: 'Coup de cœur — Alt image', type: 'string' }),
    defineField({ name: 'coupDeCoeurCta',  title: 'Coup de cœur — Texte bouton', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Privatisation' }) },
})

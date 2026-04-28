import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tarifs',
  title: 'Tarifs',
  type: 'document',
  fields: [
    defineField({
      name: 'lignes',
      title: 'Tableau des prix',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'duree', title: 'Durée', type: 'localeString' },
          { name: 'prix',  title: 'Prix (ex: 200 €)', type: 'string' },
        ],
        preview: { select: { title: 'duree.fr', subtitle: 'prix' } },
      }],
    }),
    defineField({
      name: 'conditions',
      title: 'Conditions générales',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'annulation',
      title: "Politique d'annulation",
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'delai',   title: 'Délai (ex: Annulation à 48h)', type: 'localeString' },
          { name: 'montant', title: 'Montant', type: 'localeString' },
        ],
        preview: { select: { title: 'delai.fr', subtitle: 'montant.fr' } },
      }],
    }),
    defineField({
      name: 'note',
      title: 'Note sous le tableau (ex: minimum de personnes)',
      type: 'localeString',
    }),
  ],
  preview: { prepare: () => ({ title: 'Tarifs' }) },
})

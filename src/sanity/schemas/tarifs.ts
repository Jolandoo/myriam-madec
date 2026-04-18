import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tarifs',
  title: 'Tarifs',
  type: 'document',
  // Singleton — un seul document
  fields: [
    defineField({
      name: 'lignes',
      title: 'Tableau des prix',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'duree', title: 'Durée', type: 'string' },
          { name: 'prix',  title: 'Prix (ex: 200 €)', type: 'string' },
        ],
        preview: { select: { title: 'duree', subtitle: 'prix' } },
      }],
    }),
    defineField({
      name: 'conditions',
      title: 'Conditions générales',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'annulation',
      title: "Politique d'annulation",
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'delai',   title: 'Délai (ex: Annulation à 48h)', type: 'string' },
          { name: 'montant', title: 'Montant', type: 'string' },
        ],
        preview: { select: { title: 'delai', subtitle: 'montant' } },
      }],
    }),
    defineField({
      name: 'note',
      title: 'Note sous le tableau (ex: minimum de personnes)',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Tarifs' }) },
})

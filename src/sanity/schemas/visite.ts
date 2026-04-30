import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'visite',
  title: 'Visite',
  type: 'document',
  fields: [
    defineField({ name: 'titre',            title: 'Titre',             type: 'localeString', validation: r => r.required() }),
    defineField({ name: 'slug',             title: 'Slug (URL)',        type: 'slug',   options: { source: 'titre.fr' }, validation: r => r.required() }),
    defineField({ name: 'sousTitre',        title: 'Sous-titre',        type: 'localeString' }),
    defineField({
      name: 'categorie', title: 'Catégorie', type: 'string',
      options: { list: [
        { title: 'À pied',          value: 'pied'            },
        { title: 'À vélo',          value: 'velo'            },
        { title: 'Vélo électrique', value: 'velo-electrique' },
        { title: 'En bateau',       value: 'bateau'          },
      ]},
      validation: r => r.required(),
    }),
    defineField({ name: 'duree',            title: 'Durée (ex: 2h, 2-3h)', type: 'string' }),
    defineField({ name: 'description',      title: 'Description longue',   type: 'localeText' }),
    defineField({ name: 'descriptionCourte',title: 'Description courte (card, ~120 car.)', type: 'localeString' }),
    defineField({ name: 'image',            title: 'Image card (catalogue)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageDetail',      title: 'Image hero (page détail)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageCredit',      title: 'Crédit photo (ex: © CDT Gironde)', type: 'string' }),
    defineField({
      name: 'reservation', title: 'Mode de réservation', type: 'string',
      options: { list: [
        { title: 'Office de tourisme', value: 'office-tourisme'  },
        { title: 'Contact direct',     value: 'contact-direct'   },
      ]},
    }),
    defineField({ name: 'reservationUrl', title: 'URL de réservation (si office de tourisme)', type: 'url' }),
    defineField({ name: 'tags',           title: 'Tags',                  type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'niveauActivite', title: "Niveau d'activité", type: 'string',
      options: { list: [
        { title: 'Facile',   value: 'facile'  },
        { title: 'Modéré',   value: 'modere'  },
        { title: 'Sportif',  value: 'sportif' },
      ]},
    }),
    defineField({ name: 'enfantsFriendly', title: 'Adapté aux familles', type: 'boolean' }),
    defineField({
      name: 'programme',
      title: 'Au programme (étapes de la visite)',
      description: 'Décrivez le déroulé de la visite étape par étape. Sauter une ligne entre chaque étape.',
      type: 'localeText',
    }),
    defineField({ name: 'ordre',           title: 'Ordre d\'affichage (1, 2, 3...)', type: 'number' }),
  ],
  preview: {
    select: { title: 'titre.fr', subtitle: 'categorie' },
  },
})

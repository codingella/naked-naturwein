import { defineType, defineField } from 'sanity'

export const winzer = {
  name: 'winzer',
  title: 'Winzer:in',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Land / Region',
      type: 'string',
      description: 'z.B. "Österreich, Burgenland"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wineStore',
      title: 'Weinladen',
      type: 'string', // switch to 'url' if you want a link instead
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Bild (optional)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Bilder werden automatisch formatiert: quadratisch angezeigt und in grün-weiß eingefärbt.',
      fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung (optional)',
      type: 'blockContentSimple',
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'wineStore', media: 'image' } },
}

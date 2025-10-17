import { defineType, defineField } from 'sanity'

export const dropdownItem = {
  name: 'dropdownItem',
  title: 'Dropdown-Element',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Bild (optional)',
      type: 'image',
      description:
        'Bilder werden automatisch formatiert: quadratisch angezeigt und in grün-weiß eingefärbt.',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung (optional)',
      type: 'blockContentSimple',
    }),
  ],
  preview: { select: { title: 'title', media: 'image' } },
}

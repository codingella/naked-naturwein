import { defineType } from 'sanity'

export const link = defineType({
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    {
      name: "href",
      type: "url",
      title: "External URL",
      description:
        'Paste the full link address here. Example: "https://www.example.com". For emails: "mailto:example@example.com", and for phone numbers: "tel:123456789".',
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }).required(),
    },
  ],
},);

export const complexLink = defineType({
  name: 'complexLink',
  type: 'object',
  title: 'Link',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .error(
            'A title is required and should be between 1 and 100 characters.',
          ),
    },
    {
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      options: {
        list: [
          { title: 'External URL', value: 'external' },
         { title: 'Internal Reference', value: 'internal' },
         /* { title: 'Custom Path', value: 'custom' },*/
        ],
        layout: 'radio',
      },
    },
    {
      name: 'href',
      type: 'url',
      title: 'External URL',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      description:
        'Hier immer die volle Adresse eingeben: z.B. https://www.google.com. Für Emails "mailto:example@example.de", für Telefonnummern: "tel:0176 0123 0123"',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
   /* {
      name: 'internalReference',
      type: 'reference',
      title: 'Internal Reference',
      description:
        'Link to a Project',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      to: [{ type: 'projects' }], // Adjust these types according to your schema
    },*/
   /* {
      name: 'customPath',
      type: 'string',
      title: 'Custom Path',
      hidden: ({ parent }) => parent?.linkType !== 'custom',
      description:
        'Custom Paths werden hier für interne Seiten wie zB "/imprint" verwendet',
    },*/
  ],
  preview: {
    select: {
      title: 'title', // Use the title field for the preview
    },
    prepare({ title }) {
      return {
        title: title,
      }
    },
  },
})

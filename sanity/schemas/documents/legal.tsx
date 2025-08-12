import { defineField, defineType } from 'sanity'

export const legal = defineType({
  name: "legal",
  title: "Impressum",
  type: "document",
  fields: [
    {
      type: 'seo',
      name: 'seo',
      title:'seo'
    },
    {
      type: 'blockContent',
      name: 'legal',
      title: 'Imprint & Data Protection Statement',
      description: 'Edit your imprint and data protection statement here.',
    },
  ],
});

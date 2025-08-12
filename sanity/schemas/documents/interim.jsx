import { defineField, defineType } from 'sanity'

export const interim = defineType({
  name: 'interim',
  title: 'Interim',
  type: 'document',
  fields: [
     defineField({
      name: 'text',
      title: 'Text Content',
      type: 'blockContent',
    }),
    {
      name:'link',
      type: 'url',
      title: 'Ticketlink'
    }
  ],
})

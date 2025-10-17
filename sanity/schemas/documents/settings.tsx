import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
        {
      name:'link',
      type: 'url',
      title: 'Ticketlink'
    },
    {
      type: 'defaultseo',
      name: 'defaultseo',
      title: 'Default SEO'
    },
  ],
});

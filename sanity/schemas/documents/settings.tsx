import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    {
      type: 'defaultseo',
      name: 'defaultseo',
      title: 'Default SEO'
    },
  ],
});

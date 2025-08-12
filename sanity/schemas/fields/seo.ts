import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description:
    'Page specific SEO information. Will overwrite Default SEO set in Settings',
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      title: 'Index',
      name: 'index',
      type: 'boolean',
      description: 'Tells search engines to index this page. (Default: true)',
    },
    {
      title: 'Follow',
      name: 'follow',
      type: 'boolean',
      description:
        'Tells search engines to follow links on this page. (Default: true)',
    },
    {
      title: 'Preview',
      name: 'preview',
      type: 'image',
      description:
        'Preview image for social media. Recommended size is 1200px x 630px',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      description:
        'The recommended length for descriptions is between 50 and 160 characters',
    },
  ],
});

export const defaultSeo = defineType({
  name: 'defaultseo',
  title: 'SEO',
  type: 'object',
  description:
    'Settings for SEO. This will be used as default for all pages. Can be overwritten in the page settings',
  options: { collapsible: false, collapsed: false },
  fields: [
    {
      title: 'Index',
      name: 'index',
      type: 'boolean',
      description: 'Tells search engines to index this page. (Default: true)',
    },
    {
      title: 'Follow',
      name: 'follow',
      type: 'boolean',
      description: 'Tells search engines to follow links on this page. (Default: true)',
    },
    {
      title: 'Preview',
      name: 'preview',
      type: 'image',
      description:
        'Preview image for social media. Recommended size is 1200px x 630px',
    },
    {
      title: 'Pagetitle',
      name: 'title',
      type: 'string',
      description: 'Pagetitle, shown by search engines.',
    },
    {
      title: 'Page description',
      name: 'description',
      type: 'text',
      description:
        'Page description, shown by search engines. The recommended length for descriptions is between 50 and 160 characters',
    },
  ],
});

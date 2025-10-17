import {defineType, defineField} from 'sanity'
import {isUniqueAcrossAllDocuments} from '../utils/unique'
import { orderRankField } from '@sanity/orderable-document-list'

export const section = {
  name: 'section',
  title: 'Abschnitt',
  type: 'document',
  fields: [
    orderRankField({ type: 'section' }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Individuell Für jeden Abschnitt. Möglichst nur ein Wort (Wird auch im Menü verwendet).',
      validation: (Rule) => Rule.required(),
    }),
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Id für den abschnitt. Notig für die verlinkung im Menu.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueAcrossAllDocuments
      },
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: 'sectionType',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Dropdown-Liste', value: 'dropdownList'},
          {title: 'Winzer:innen', value: 'winzer'},
          {title: 'Bilder', value: 'images'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Text
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'blockContentSimple',
      description: 'Formatierungen wie Abschnitte werden auch auf der Website übernommen.',
      hidden: ({document}) => document?.sectionType !== 'text',
      validation: (Rule) =>
        Rule.custom((val, ctx) =>
          ctx.document?.sectionType !== 'text' ? true : (val?.length ? true : 'Inhalt erforderlich.')
        ),
    }),

    // Dropdown List
    defineField({
      name: 'items',
      title: 'Elemente',
      type: 'array',
      description: 'Die Dropdownliste zeigt eine Liste mit den Titeln der Elemente. Diese Elemente können aufgeklappt werden um optional Text und Bild anzuzeigen.',
      of: [{type: 'dropdownItem'}],
      hidden: ({document}) => document?.sectionType !== 'dropdownList',
      validation: (Rule) =>
        Rule.custom((val, ctx) =>
          ctx.document?.sectionType !== 'dropdownList' ? true : ((val?.length ?? 0) > 0 || 'Mindestens ein Element erforderlich.')
        ),
    }),

    // Images
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [{name: 'alt', title: 'Alt-Text', type: 'string'}],
      }],
      options: {layout: 'grid'},
      description: 'Bilder werden automatisch formatiert und in grün-weiß eingefärbt.',
      hidden: ({document}) => document?.sectionType !== 'images',
      validation: (Rule) =>
        Rule.custom((val, ctx) =>
          ctx.document?.sectionType !== 'images' ? true : ((val?.length ?? 0) > 0 || 'Mindestens ein Bild erforderlich.')
        ),
    }),

    // Winzer:innen
    defineField({
      name: 'winzers',
      title: 'Winzer:innen',
      type: 'array',
      of: [{type: 'winzer'}],
      description: 'Sortierbare Liste für die Winzer:innen. Name, Region & Weinläden werden sofort angezeigt. beim Klicken können optional Text und Bild ausgeklappt werden, wie bei der Dropdown-Liste.',
      hidden: ({document}) => document?.sectionType !== 'winzer',
      validation: (Rule) =>
        Rule.custom((val, ctx) =>
          ctx.document?.sectionType !== 'winzer' ? true : ((val?.length ?? 0) > 0 || 'Mindestens ein Eintrag erforderlich.')
        ),
    }),
  ],
  preview: {
    select: {title: 'title', type: 'sectionType', media: 'images.0'},
    prepare({title, type, media}) {
      const typeLabel =
        type === 'text' ? 'Text' :
        type === 'dropdownList' ? 'Dropdown-Liste' :
        type === 'winzer' ? 'Winzer:innen' :
        type === 'images' ? 'Bilder' : 'Abschnitt'
      return {title: title || 'Abschnitt', subtitle: typeLabel, media}
    }
  }
}

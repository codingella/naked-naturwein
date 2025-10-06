import React from 'react'
import {defineType, defineArrayMember} from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
const UppercaseIcon = () => (<span>ABC</span>)
const UppercaseDecorator = (props:any) => (
  <span style={{ textTransform: 'uppercase'}}>{props.children}</span>
)

const SerifIcon = () => (
  <span style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>S</span>
)

const SerifDecorator = (props: {children: React.ReactNode}) => (
  <span style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>
    {props.children}
  </span>
)

/**
 * Reusable Link annotation:
 * - Either paste an external URL (http/https/mailto/tel/relative)
 * - OR upload a PDF file that will be hosted on Sanity CDN
 */
const linkAnnotation = {
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'Link URL',
      description:
        'Supports http/https, mailto, tel, or relative paths like "/imprint". Leave empty if you upload a PDF.',
      hidden: ({parent}: any) => !!parent?.file,
      validation: (Rule: any) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
          allowRelative: true,
        }),
    },
    {
      name: 'file',
      type: 'file',
      title: 'PDF file',
      description: 'Upload a PDF to link to (served via Sanity CDN). Leave empty if you use URL.',
      options: {
        storeOriginalFilename: true,
        accept: 'application/pdf',
      },
      hidden: ({parent}: any) => !!parent?.href,
    },
    {
      name: 'openInNewTab',
      type: 'boolean',
      title: 'Open in new tab?',
      initialValue: true,
    },
    {
      name: 'downloadFilename',
      type: 'string',
      title: 'Download filename (optional)',
      description: 'Set a custom filename for downloads (only used when rendering with download).',
    },
  ],
  // Require at least one of href or file
  validation: (Rule: any) =>
    Rule.custom((val: any) => {
      if (!val) return 'Provide a URL or upload a PDF.'
      if (!val.href && !val.file) return 'Provide a URL or upload a PDF.'
      return true
    }),
}

export const blockContent = defineType({
  name: 'blockContent',
  type: 'array',
  title: 'Block Content',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Uppercase', value: 'uppercase', icon: UppercaseIcon, component: UppercaseDecorator },
          { title: 'Serif', value: 'serif', icon: SerifIcon, component: SerifDecorator },
        ],
        annotations: [linkAnnotation],
      },
    },
  ],
})

export const blockContentSimple = defineType({
  name: "blockContentSimple",
  type: "array",
  title: "Block Content",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
      ],
      lists: [/*{ title: "Bullet", value: "bullet" }*/],
      marks: {
        decorators: [
         
          ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "Link URL",
                description:
                  'Supports full URLs (e.g. "https://..."), mailto, tel, or relative paths like "/legal".',
                validation: Rule =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                    relativeOnly: false, // this allows *both* relative and absolute URLs
                  }).required(),
              },
            ],
          },
        ]
      },
    },
  ],
});

export const blockContentWithImage = defineType({
  name: "blockContentWithImage",
  type: "array",
  title: "Text and Images",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
        /*  { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          {title: "Justified", value: "justified", icon: JustifyIcon, component: JustifyDecorator},*/
        ],
        annotations: [
          {
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
          },
        ],
      },
    },
    {
      type: "image", // Allow images in the portable text
      fields: [
        {
          name: "description",
          type: "string",
          title: "Bildbeschreibung",
        },
        {
          name: "alt",
          type: "string",
          title: "alt-text",
          description: "Für Suchmaschienen & Accessability",
        },
      ],
      options: {
        hotspot: true, // Enable image cropping
      },
      preview: {
        select: {
          asset: 'asset',
          altText: 'alt',
          description: 'description',
        },
        prepare ({ asset, altText, description }) {
          return {
            media: {
              ...asset,
              _type: 'reference',
            },
            title: description,
            subtitle: altText
          };
        },
      },
    },
  ],
});
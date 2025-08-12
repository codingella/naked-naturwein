import React from 'react'
import {defineType, defineArrayMember} from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

const UppercaseIcon = () => (
  <span>ABC</span>
)
const UppercaseDecorator = props => (
  <span style={{ textTransform: 'uppercase'}}>{props.children}</span>
)
// Simple icon + editor preview for the decorator
const SerifIcon = () => (
  <span style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>S</span>
);

const SerifDecorator = (props: {children: React.ReactNode}) => (
  <span style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>
    {props.children}
  </span>
);

export const blockContent = defineType({
  name: "blockContent",
  type: "array",
  title: "Block Content",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          {
            title: "Uppercase",
            value: "uppercase",
            icon: UppercaseIcon,
            component: UppercaseDecorator,
          },
          // 👇 New inline serif mark with Studio preview
          {
            title: "Serif",
            value: "serif",
            icon: SerifIcon,
            component: SerifDecorator,
          },
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
                  'Supports full URLs (e.g. "https://..."), mailto, tel, or relative paths like "/imprint".',
                validation: (Rule: any) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }).required(),
              },
            ],
          },
        ],
      },
    },
  ],
});

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
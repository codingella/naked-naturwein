import { renderGIF, toPlainText } from '../../../helpers/utils'

export const media = {
  name: 'media',
  title: 'Media',
  type: 'object',
  collabsible: true,
  fields: [
    {
      title: 'Type',
      description:
        'Choose between Image (supports JPG, SVG, PNG, GIF), Video (hosted/served via Vimeo). Vimeo integration still to be added.',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.type !== 'image',
    },
   /* {
      name: 'video',
      type: 'vimeo',
      title: 'Vimeo Video',
      hidden: ({ parent }) => parent?.type !== 'video',
    },*/
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description:
        'optional alternative text. Not directly visible. Good for seo and visually impaired users.',
    },
  ],
/*  preview: {
    select: {
      /* playbackId: 'video.asset.playbackId',
      video: 'video.thumbnail',
      image: 'image',
      type: 'type',
    },
    prepare({ video, image, type }) {
      console.log(video);
      return {
        media:  type === 'video' ? <img src={`${video}`}/> :  image,
        subtitle: type === 'video' ? 'Video' : 'Image',
      }
    },
  },*/
}
/*
export const mediaWithCaption = {
  name: 'mediaWithCaption',
  title: 'Media',
  type: 'object',
  collabsible: true,
  fields: [
    {
      title: 'Type',
      description:
        'Choose between Image (supports JPG, SVG, PNG, GIF), Video (hosted/served via Vimeo).',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.type !== 'image',
    },
    {
      name: 'video',
      type: 'vimeo',
      title: 'Vimeo Video',
      hidden: ({ parent }) => parent?.type !== 'video',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'blockContent',
      description: 'Text to be aligned under the media.',
    },
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description:
        'optional alternative text. Not directly visible. Good for seo and visually impaired users.',
    },
  ],
  preview: {
    select: {
      /* playbackId: 'video.asset.playbackId',
      video: 'video.thumbnail',
      image: 'image',
      type: 'type',
    },
    prepare({ video, image, type }) {
      return {
        media:  type === 'video' ? <img src={`${video}`}/> :  image,
        subtitle: /*type === 'video' ? 'Video' : 'Image' video,
      }
    },
  },
}*/

import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/lib/sanity.api'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
//import { muxInput } from 'sanity-plugin-mux-input'
//import { netlifyTool } from 'sanity-plugin-netlify'

import {StudioStructure} from './studioStructure'
import schema from './sanity/schemas'

const title = "Naked Naturweinmesse"

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema,
  plugins: [
    structureTool({
      structure: StudioStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
   // muxInput({ mp4_support: 'standard' }),
    //netlifyTool(),
   // media(),
  ],

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        // Only allow "radioShow" and "event" in the "Create New" button
        return prev.filter((templateItem) =>
          ['radioShow', 'events', 'collections'].includes(templateItem.templateId)
        )
      }
      return prev
    },
  },

})

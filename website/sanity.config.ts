'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from '@/sanity/lib/api'
import {types} from '@/sanity/schemas'

export default defineConfig({
  projectId,
  dataset,
  schema: {types},
  releases: {enabled: true},
  plugins: [
    presentationTool({previewUrl: {previewMode: {enable: '/api/draft-mode/enable'}}}),
    structureTool(),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})

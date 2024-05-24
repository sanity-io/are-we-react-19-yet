'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from '@sanity/vision'
import { PluginOptions, defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from '@/sanity/lib/api'
import report from '@/sanity/schemas/documents/report'
import pkg from '@/sanity/schemas/objects/package'

export default defineConfig({
    projectId,
    dataset,
    schema: { types: [report, pkg] },
    scheduledPublishing: { enabled: false },
    plugins: [
        presentationTool({
            previewUrl: { previewMode: { enable: '/api/draft' } },
        }),
        structureTool(),
        visionTool({ defaultApiVersion: apiVersion }),
    ].filter(Boolean) as PluginOptions[],
})

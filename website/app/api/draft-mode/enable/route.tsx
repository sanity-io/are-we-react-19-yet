/**
 * This file is used to allow Presentation to set the app in Draft Mode, which will load Visual Editing
 * and query draft content and preview the content as it will appear once everything is published
 */

import {defineEnableDraftMode} from 'next-sanity/draft-mode'

import {client} from '@/sanity/lib/client'

const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.')
}

export const {GET} = defineEnableDraftMode({client: client.withConfig({token})})

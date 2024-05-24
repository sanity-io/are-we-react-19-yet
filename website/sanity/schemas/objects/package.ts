import { defineField, defineType } from 'sanity'
import { CheckmarkIcon, CloseIcon } from '@sanity/icons'

export default defineType({
    name: 'package',
    type: 'object',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'url',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'pass',
            type: 'boolean',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            pass: 'pass',
        },
        prepare({ title, pass }) {
            return {
                title,
                media: pass ? CheckmarkIcon : CloseIcon,
                subtitle: pass ? 'passed' : 'failed',
            }
        },
    },
})

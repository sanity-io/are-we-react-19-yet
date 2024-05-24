import { CloseCircleIcon, CheckmarkCircleIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import pkg from '../objects/package'
import { format, parseISO } from 'date-fns'

export default defineType({
    name: 'report',
    title: 'Report',
    type: 'document',
    fields: [
        defineField({
            name: 'test',
            type: 'array',
            of: [{ type: pkg.name }],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            createdAt: '_createdAt',
            pkg: 'package',
        },
        prepare({ createdAt, pkg }) {
            let progress = '0%'
            let pass = false
            if (Array.isArray(pkg) && pkg.length > 0) {
                pass = pkg.every((p: any) => p?.pass === true)
                let passing = 0
                for (const unsafe of pkg) {
                    const safe =
                        typeof unsafe === 'object' && unsafe !== null
                            ? unsafe
                            : {}
                    if (safe.pass === true) {
                        passing++
                    }
                }
                progress = `${Math.floor(100 * (passing / pkg.length))}%`
            }

            return {
                title: pass ? '🎉 100% 🎉' : `${progress} tests are passing`,
                media: pass ? CheckmarkCircleIcon : CloseCircleIcon,
                subtitle: `on ${format(parseISO(createdAt), 'LLL d, yyyy')}`,
            }
        },
    },
    // */
})

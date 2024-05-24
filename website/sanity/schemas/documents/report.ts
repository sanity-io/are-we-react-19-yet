import {CloseCircleIcon, CheckmarkCircleIcon, CheckmarkIcon, CloseIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {format, parseISO} from 'date-fns'

export default defineType({
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    defineField({
      name: 'test',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: 'URL',
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
            prepare({title, pass}) {
              return {
                title,
                media: pass ? CheckmarkIcon : CloseIcon,
                subtitle: pass ? 'passed' : 'failed',
              }
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((values) => {
          if (!Array.isArray(values)) {
            return 'Test must be an array'
          }
          const unique = new Set()
          for (const value of values) {
            if (value && typeof value === 'object' && 'name' in value) {
              if (unique.has(value.name)) {
                return `Package names must be unique: ${value.name} is duplicated`
              }
              unique.add(value.name)
            }
          }
          return true
        }).required(),
    }),
  ],
  preview: {
    select: {
      createdAt: '_createdAt',
      pkg: 'test',
    },
    prepare({createdAt, pkg}) {
      let progress = '0%'
      let pass = false
      if (Array.isArray(pkg) && pkg.length > 0) {
        pass = pkg.every((p: any) => p?.pass === true)
        let passing = 0
        for (const unsafe of pkg) {
          const safe = typeof unsafe === 'object' && unsafe !== null ? unsafe : {pass: false}
          if (safe.pass === true) {
            passing++
          }
        }
        progress = `${Math.floor(100 * (passing / pkg.length))}%`
      }
      return {
        title: pass ? '🎉 100% 🎉' : `${progress} tests are passing`,
        media: pass ? CheckmarkCircleIcon : CloseCircleIcon,
        subtitle: createdAt ? `on ${format(parseISO(createdAt), 'LLL d, yyyy')}` : undefined,
      }
    },
  },
})

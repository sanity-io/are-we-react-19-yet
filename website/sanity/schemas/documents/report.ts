import {defineField, defineType} from 'sanity'
import pkg from '../objects/package'

export default defineType({
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    defineField({
      name: 'package',
      type: 'array',
      of: [{type: pkg.name}],
    }),
  ],
  /*
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            date: 'date',
            media: 'coverImage',
        },
        prepare({ title, media, author, date }) {
            const subtitles = [
                author && `by ${author}`,
                date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
            ].filter(Boolean)

            return { title, media, subtitle: subtitles.join(' ') }
        },
    },
    // */
})

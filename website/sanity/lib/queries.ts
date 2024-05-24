import {groq} from 'next-sanity'

export const reportQuery = groq`
  *[_type == "report" && count(test) > 0] | order(_createdAt desc)[0]{
    _createdAt,
    test,

  }
`

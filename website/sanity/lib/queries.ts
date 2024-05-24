import {groq} from 'next-sanity'

export const reportQuery = groq`
  *[_type == "report" && defined(test)] | order(_createdAt desc)[0]{
    _createdAt,
    "test": coalesce(test, []),
    "total": coalesce(count(test), 0),
    "passing": coalesce(count(test[pass == true]), 0),
  }
`

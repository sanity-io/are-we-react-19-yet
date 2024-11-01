import {defineQuery} from 'next-sanity'

export const reportQuery = defineQuery(`
  *[_type == "report" && defined(test)] | order(_createdAt desc)[0]{
    "updatedAt": coalesce(_updatedAt, _createdAt),
    "test": coalesce(test[]{
      _key,
      name,
      version,
      "pass": coalesce(pass, false)
    }, []),
    "total": coalesce(count(test), 0),
    "passing": coalesce(count(test[pass == true]), 0),
  }
`)

export const packageQuery = defineQuery(`
*[_type == "report" && defined(test)] | order(_createdAt desc)[0]{
  _id,
  "updatedAt": coalesce(_updatedAt, _createdAt),
  "package": test[name == $name][0]{name, version, pass, log, testJson},
}`)

export const packageNamesQuery = defineQuery(`
  *[_type == "report" && defined(test)] | order(_createdAt desc)[0].test[].name
`)

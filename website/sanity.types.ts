/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type Report = {
  _id: string
  _type: 'report'
  _createdAt: string
  _updatedAt: string
  _rev: string
  test?: Array<{
    name?: string
    version?: string
    pass?: boolean
    log?: string
    testJson?: string
    _key: string
  }>
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityImageHotspot
  | SanityImageCrop
  | SanityFileAsset
  | SanityImageAsset
  | SanityImageMetadata
  | Geopoint
  | Slug
  | SanityAssetSourceData
  | Report
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ./sanity/lib/queries.ts
// Variable: reportQuery
// Query: *[_type == "report" && defined(test)] | order(_createdAt desc)[0]{    "updatedAt": coalesce(_updatedAt, _createdAt),    "test": coalesce(test[]{      _key,      name,      version,      "pass": coalesce(pass, false)    }, []),    "total": coalesce(count(test), 0),    "passing": coalesce(count(test[pass == true]), 0),  }
export type ReportQueryResult = {
  updatedAt: string
  test:
    | Array<{
        _key: string
        name: string | null
        version: string | null
        pass: boolean | false
      }>
    | Array<never>
  total: number | 0
  passing: number | 0
} | null
// Variable: packageQuery
// Query: *[_type == "report" && defined(test)] | order(_createdAt desc)[0]{  _id,  "updatedAt": coalesce(_updatedAt, _createdAt),  "package": test[name == $name][0]{name, version, pass, log, testJson},}
export type PackageQueryResult = {
  _id: string
  updatedAt: string
  package: {
    name: string | null
    version: string | null
    pass: boolean | null
    log: string | null
    testJson: string | null
  } | null
} | null
// Variable: packageNamesQuery
// Query: *[_type == "report" && defined(test)] | order(_createdAt desc)[0].test[].name
export type PackageNamesQueryResult = Array<string | null> | null

// Query TypeMap
import '@sanity/client'
declare module '@sanity/client' {
  interface SanityQueries {
    '\n  *[_type == "report" && defined(test)] | order(_createdAt desc)[0]{\n    "updatedAt": coalesce(_updatedAt, _createdAt),\n    "test": coalesce(test[]{\n      _key,\n      name,\n      version,\n      "pass": coalesce(pass, false)\n    }, []),\n    "total": coalesce(count(test), 0),\n    "passing": coalesce(count(test[pass == true]), 0),\n  }\n': ReportQueryResult
    '\n*[_type == "report" && defined(test)] | order(_createdAt desc)[0]{\n  _id,\n  "updatedAt": coalesce(_updatedAt, _createdAt),\n  "package": test[name == $name][0]{name, version, pass, log, testJson},\n}': PackageQueryResult
    '\n  *[_type == "report" && defined(test)] | order(_createdAt desc)[0].test[].name\n': PackageNamesQueryResult
  }
}

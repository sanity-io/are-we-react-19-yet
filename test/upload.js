// @ts-check

import {readFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
import {createClient} from '@sanity/client'

const require = createRequire(import.meta.url)

const token = process.env.SANITY_TOKEN
if (!token) {
  console.log('Please provide a SANITY_TOKEN')
  process.exit(1)
}
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (!projectId) {
  console.log('Please provide a NEXT_PUBLIC_SANITY_PROJECT_ID')
  process.exit(1)
}
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
if (!dataset) {
  console.log('Please provide a NEXT_PUBLIC_SANITY_DATASET')
  process.exit(1)
}
const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-05-27',
})
const regex = /Issues with peer dependencies found([\s\S]*?)Done in/

const {testResults} = JSON.parse((await readFile('./result.json', 'utf8')).toString())

const pnpmTests = testResults.find((test) => test.name.endsWith('pnpm.test.ts'))
if (!pnpmTests) {
  console.log('No pnpm tests found')
  process.exit(1)
}
const {assertionResults} = pnpmTests
const result = []
for (const {title, status} of assertionResults) {
  const testJson = require(`./fixtures/${title}/package.json`)
  const version = testJson.dependencies[title]
  const pkgResult = {
    _key: title.replace(/^\@/, '').replace(/\//, '__'),
    name: title,
    pass: status === 'passed',
    version,
    testJson: JSON.stringify(testJson, null, 2),
  }
  let log = ''
  try {
    log = await readFile(`./fixtures/${title}/install.log`, 'utf8')
    const match = log.match(regex)
    if (match && match[1]) {
      log = match[1].trim()
    } else {
      log = ''
    }
  } catch {
    // ignore
  }
  Object.assign(pkgResult, {log})
  result.push(pkgResult)
}
const document = {
  _id: new Date().toJSON().split('T')[0],
  _type: 'report',
  test: result,
}
console.log('About to create document:', document)
const response = await client.createOrReplace(document)
console.log('Document created: ', response)

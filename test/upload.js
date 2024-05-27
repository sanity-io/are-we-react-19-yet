// @ts-check

import {writeFile, stat, mkdir, readFile} from 'node:fs/promises'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.log('Please provide a SANITY_TOKEN')
  process.exit(1)
}

const {testResults} = JSON.parse((await readFile('./result.json', 'utf8')).toString())

const pnpmTests = testResults.find((test) => test.name.endsWith('pnpm.test.ts'))
if (!pnpmTests) {
  console.log('No pnpm tests found')
  process.exit(1)
}
const {assertionResults} = pnpmTests
console.log(assertionResults)

import {describe, test} from 'vitest'
import {glob} from 'glob'

describe('pnpm install --resolution-only', async () => {
  const pkgfiles = await glob('fixtures/**/package.json', {ignore: '**/node_modules/**'})
  console.log(pkgfiles)
})

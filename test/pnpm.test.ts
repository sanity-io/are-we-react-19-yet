import {describe, expect, test} from 'vitest'
import {glob} from 'glob'
import {execa} from 'execa'
import {writeFile} from 'node:fs/promises'

const pkgfiles = await glob('fixtures/**/package.json', {ignore: '**/node_modules/**'})

describe.concurrent('pnpm install --resolution-only', () => {
  test.each(pkgfiles.map((pkg) => pkg.replace(/^fixtures\//, '').replace(/\/package.json$/, '')))(
    '%s',
    async (pkg) => {
      const {stdout} = await execa({
        cwd: `fixtures/${pkg}`,
      })`pnpm install --resolution-only --no-frozen-lockfile`
      await writeFile(`fixtures/${pkg}/install.log`, stdout)
      expect(stdout).not.toMatch('unmet peer react')
    },
  )
})

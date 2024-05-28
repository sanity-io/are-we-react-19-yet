import {describe, expect, test} from 'vitest'
import {glob} from 'glob'
import {execa} from 'execa'

const pkgfiles = await glob('fixtures/**/package.json', {ignore: '**/node_modules/**'})

describe('pnpm install --resolution-only', () => {
  test.each(pkgfiles.map((pkg) => pkg.replace(/^fixtures\//, '').replace(/\/package.json$/, '')))(
    '%s',
    async (pkg) => {
      const {stdout} = await execa({
        cwd: `fixtures/${pkg}`,
      })`pnpm install --resolution-only --no-frozen-lockfile`
      expect(stdout).toMatchSnapshot()
      expect(stdout).not.toMatch('unmet peer react')
    },
  )
})

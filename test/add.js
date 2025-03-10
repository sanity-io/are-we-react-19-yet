// @ts-check

import 'zx/globals'
import {argv} from 'node:process'
import {writeFile, stat, mkdir, readFile} from 'node:fs/promises'

const [, , ...packageNames] = argv

if (packageNames.length === 0) {
  console.log('Please provide package names')
  process.exit(1)
}

const {packageManager} = JSON.parse(
  await readFile(new URL(`./package.json`, import.meta.url), 'utf-8'),
)

for (const pkg of packageNames) {
  let pkgName = pkg
  let distTag = 'latest'
  if (pkg.startsWith('@') && pkg.split('@').length === 3) {
    const [, name, version] = pkg.split('@')
    pkgName = `@${name}`
    distTag = version
  } else if (!pkg.startsWith('@') && pkg.split('@').length === 2) {
    pkgName = pkg.split('@')[0]
    distTag = pkg.split('@')[1]
  }
  console.log('Adding package: ', pkgName, 'with dist-tag', distTag)
  const result = await stat(`fixtures/${pkgName}`).catch(() => null)
  if (!result?.isDirectory()) {
    const fixtureFolder = new URL(`./fixtures/${pkgName}`, import.meta.url)
    const createDir = await mkdir(fixtureFolder, {recursive: true})
    console.log('Created fixture folder', createDir)
  }
  await writeFile(
    `fixtures/${pkgName}/package.json`,
    JSON.stringify(
      {
        dependencies: {
          '@types/react': '^19.0.0',
          '@types/react-dom': '^19.0.0',
          '@types/react-is': '^19.0.0',
          'react': '^19.0.0',
          'react-dom': '^19.0.0',
          'react-is': '^19.0.0',
          'sanity': '^3.71.2',
        },
        packageManager,
      },
      null,
      2,
    ),
  )
  await $`cd fixtures/${pkgName} && pnpm add ${pkgName}@${distTag} --save-exact`
  await $`prettier --write fixtures/${pkgName}/package.json`
  console.log(`Finished adding fixtures/${pkgName}/package.json`)
}

import {argv} from 'node:process'

const packageNames = argv[2]

if (!packageNames) {
  console.log('Please provide package names')
  process.exit(1)
}

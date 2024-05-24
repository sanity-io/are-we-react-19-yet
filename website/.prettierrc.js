const defaults = require('@sanity/prettier-config')

/** @type {import("prettier").Config} */
const config = {
  ...defaults,
  plugins: [...defaults.plugins, 'prettier-plugin-tailwindcss'],
}

module.exports = config

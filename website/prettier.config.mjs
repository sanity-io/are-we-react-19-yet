import defaults from '@sanity/prettier-config'

/** @type {import("prettier").Config} */
const config = {
  ...defaults,
  plugins: [...defaults.plugins, 'prettier-plugin-tailwindcss'],
}

export default config

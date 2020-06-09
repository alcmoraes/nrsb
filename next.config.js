
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');
const withSass = require('@zeit/next-sass');  // Add this declaration

const withSassObject = withSass({
  serverless: true,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    modules: true,
    localIdentName: "[local]",
  },
  sassLoaderOptions: {
    includePaths: ["node_modules"]
  }
})

module.exports = phase => {

  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = (phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1') || phase === PHASE_PRODUCTION_SERVER
  // when `next build` or `npm run build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}`, `isProd:${isProd}`,`isStaging:${isStaging}`)

  // Add your ENV variables here
  const env = {}

  // next.config.js object
  return {
    env,
    ...withSassObject
  }
}
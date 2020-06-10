const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');

module.exports = (phase, { defaultConfig }) => {

  // if phase === PHASE_DEVELOPMENT_SERVER ...
  // if phase === PHASE_PRODUCTION_SERVER ...

  return {
    serverRuntimeConfig: {
      // Will only be available on the server side
      mySecret: 'secret',
      secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
    publicRuntimeConfig: {
      localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
        ? process.env.LOCALE_SUBPATHS
        : 'all',
    }
  }
}
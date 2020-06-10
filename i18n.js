const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig

const localeSubpathVariations = {
  all: {
    en: 'en',
    br: 'br',
  },
}

module.exports = new NextI18Next({
  ignoreRoutes: ['/_next/', '/static/', '/public/', '/api/', '/i18n'],
  localePath: 'public/i18n',
  shallowRender: true,
  otherLanguages: ['br'],
  localeSubpaths: localeSubpathVariations[localeSubpaths],
})
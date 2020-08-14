const NextI18Next = require('next-i18next').default;

let localeSubpaths;

try {
  localeSubpaths = require('next/config').default().publicRuntimeConfig.localeSubpaths;
} catch (ERR) {
  localeSubpaths = 'all';
}

const localeSubpathVariations = {
  all: {
    en: 'en',
    br: 'br',
  },
};

module.exports = new NextI18Next({
  ignoreRoutes: ['/_next/', '/static/', '/public/', '/api/', '/i18n'],
  localePath: 'public/i18n',
  shallowRender: true,
  otherLanguages: ['br'],
  localeSubpaths: localeSubpathVariations[localeSubpaths],
});

const IntlPolyfill = require('intl');

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const { readFileSync } = require('fs');
const { basename } = require('path');
const { createServer } = require('http');

const accepts = require('accepts');
const glob = require('glob');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = glob
  .sync('./lang/*.json')
  .map(f => basename(f, '.json'))

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map()
const getLocaleDataScript = locale => {
  let lang = locale && locale.constructor === String ? locale.split('-')[0].toLowerCase() : 'pt';
  // In case the first part is "pt". We know it should be BR;
  lang = lang == "pt" ? "br" : lang;
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(
      `@formatjs/intl-relativetimeformat/dist/locale-data/${lang}`
    )
    const localeDataScript = readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(lang, localeDataScript)
  }
  return localeDataCache.get(lang)
}

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = locale => {
  return require(`./lang/${locale}.json`)
}

function parseCookies(cookie) {
  let rx = /([^;=\s]*)=([^;]*)/g;
  let obj = { };
  for ( let m ; m = rx.exec(cookie) ; )
    obj[ m[1] ] = decodeURIComponent( m[2] );
  return obj;
}

app.prepare().then(() => {
  createServer((req, res) => {
    let cookies = parseCookies(req.headers.cookie);
    const accept = accepts(req)
    const locale = cookies.locale || accept.language(supportedLanguages)
    req.locale = locale
    req.localeDataScript = getLocaleDataScript(locale)
    req.messages = getMessages(locale)
    handle(req, res)
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
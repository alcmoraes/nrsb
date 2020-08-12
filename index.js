const { setConfig } = require('next/config');
const { publicRuntimeConfig } = require('./next.config')(process.env.NODE_ENV, { defaultConfig: {} });

setConfig({ publicRuntimeConfig });

require('./server');

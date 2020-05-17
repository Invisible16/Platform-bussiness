const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');
const withCSS = require('./libs/next-css');

module.exports = (phase, { defaultConfig }) => {
  const localIdentName =
    phase === PHASE_DEVELOPMENT_SERVER ? '[path][name]-[local]--[hash:base64:15]' : '[hash:base64]';

  return withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      url: false,
      camelCase: true,
      localIdentName
    },
    webpack: (config, { buildId, dev }) => {
      config.resolve.modules.push(path.join(__dirname, 'desktop'));
      return config;
    }
  });
};

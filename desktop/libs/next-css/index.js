/**
 * This is a temporary replacement for Next-CSS that fixes a state issue
 * described in this issue: https://github.com/zeit/next-plugins/issues/373
 *
 * We're copying the source files from the next-plugin repo directly found here:
 * https://github.com/zeit/next-plugins/tree/master/packages/next-css
 *
 * We're doing this because next-plugins uses a mono-repo tool called lerna
 * which makes it difficult to simply fork the project and point our
 * package.json to our fork. So this is a pragmatic solution for now until we
 * resolve the issue linked above. 😭
 */
const cssLoaderConfig = require('./css-loader-config');

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        );
      }

      const { dev, isServer } = options;
      const { cssModules, cssLoaderOptions, postcssLoaderOptions } = nextConfig;

      options.defaultLoaders.css = cssLoaderConfig(config, {
        extensions: ['css'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer
      });

      config.module.rules.push({
        test: /\.css$/,
        issuer(issuer) {
          if (issuer.match(/pages[\\/]_document\.js$/)) {
            throw new Error(
              'You can not import CSS files in pages/_document.js, use pages/_app.js instead.'
            );
          }
          return true;
        },
        use: options.defaultLoaders.css
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};

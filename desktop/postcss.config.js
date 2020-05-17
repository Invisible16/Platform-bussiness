module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-custom-properties': {},
    'postcss-nesting': {},
    'postcss-flexbugs-fixes': {},
    autoprefixer: {},
    'postcss-modules-values': {},
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    },
    'postcss-apply': {}
  }
};

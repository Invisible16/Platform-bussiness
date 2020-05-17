const next = require('./next');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  const base = app.get('base');
  app.get('*', next({ base, service: app }));
};

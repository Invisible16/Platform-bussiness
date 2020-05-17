const path = require('path');
const desktop = require('../../desktop');

module.exports = function(options = {}) {
  const { service } = options;

  return async function next(req, res, next) {
    if (req.url === '/service-worker.js') {
      return desktop.nextApp.serveStatic(req, res, path.join(`desktop/.next`, req.url));
    } else if (req.originalUrl.indexOf(`/${options.base}`) === 0) {
      return next();
    } else {
      return desktop.getHandle(req, res);
    }
  };
};

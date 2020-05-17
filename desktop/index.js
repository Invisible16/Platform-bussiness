const next = require('next');
const createRoutes = require('./routes');

const dev = process.env.NODE_ENV === 'development';
const nextApp = next({ dir: './desktop', dev });

const getHandle = (req, res) => {
  const routes = createRoutes();
  const handle = routes.getRequestHandler(nextApp);
  return handle(req, res);
};

module.exports = {
  nextApp,
  getHandle
};

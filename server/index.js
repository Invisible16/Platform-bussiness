/* eslint-disable no-console */
const PrettyError = require('pretty-error');
PrettyError.start();

const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const desktop = require('../desktop');

desktop.nextApp.prepare().then(() => {
  const server = app.listen(port);
  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );
  server.on('listening', () => logger.info('API started on http://%s:%d', app.get('host'), port));
});

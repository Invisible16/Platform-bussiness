const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const checkUserStatus = require('./hooks/checkUserStatus');
const checkPermissions = require('feathers-permissions');

const { protect } = local.hooks;

module.exports = function(app) {
  const config = app.get('authentication');
  const base = app.get('base');

  config.path = `/${base}${config.path}`;
  config.service = `${base}/${config.service}`;

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service(`${base}/authentication`).hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),
        checkPermissions({ roles: ['admin', 'user'] }),
        checkUserStatus({ status: 'activated' })
      ],
      remove: [authentication.hooks.authenticate('jwt')]
    },
    after: {
      create: [
        context => {
          context.result = Object.assign(context.result, context.params.user);
        },
        protect('password')
      ],
      remove: []
    }
  });
};

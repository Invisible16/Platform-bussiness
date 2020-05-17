const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), checkPermissions({ roles: ['admin'] })],
    get: [authenticate('jwt'), checkPermissions({ roles: ['admin'] })],
    create: [hashPassword(), authenticate('jwt'), checkPermissions({ roles: ['admin'] })],
    update: [hashPassword(), authenticate('jwt'), checkPermissions({ roles: ['admin'] })],
    patch: [hashPassword(), authenticate('jwt'), checkPermissions({ roles: ['admin'] })],
    remove: [authenticate('jwt'), checkPermissions({ roles: ['admin'] })]
  },

  after: {
    all: [protect('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

const dauria = require('dauria');
const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const checkUserStatus = require('../../hooks/checkUserStatus');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      checkPermissions({ roles: ['admin'] }),
      checkUserStatus({ status: 'activated' })
    ],
    get: [],
    create: [
      context => {
        if (!context.data.uri && context.params.file) {
          const file = context.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          context.data = { uri: uri };
        }
      }
    ],
    remove: []
  },

  after: {
    all: [],
    get: [
      context => {
        if (context.result.uri) {
          context.result.filename = context.params.query.filename;
          context.result.file = dauria.parseDataURI(context.result.uri);
          delete context.result.uri;
        }
      }
    ],
    create: [
      context => {
        if (context.result.uri) {
          delete context.result.uri;
        }
      }
    ],
    remove: []
  },

  error: {
    all: [],
    get: [],
    create: [],
    remove: []
  }
};

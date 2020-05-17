const isNil = require('lodash/isNil');
const errors = require('@feathersjs/errors');

module.exports = function checkUserStatus(options = { status: 'activated' }) {
  return function(context) {
    const conditions =
      isNil(context.params.user.status) || context.params.user.status !== options.status;
    if (conditions) {
      const notAuthenticated = new errors.NotAuthenticated('User does not exist');
      context.result = notAuthenticated.toJSON();
    }
  };
};

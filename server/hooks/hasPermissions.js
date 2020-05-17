const isNil = require('lodash/isNil');

module.exports = function hasPermissions(...permissions) {
  return function(context) {
    const index = context.params.user.permissions.find(e => permissions.includes(e));
    return isNil(index) ? false : true;
  };
};

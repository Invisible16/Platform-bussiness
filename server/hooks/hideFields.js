const isNil = require('lodash/isNil');

module.exports = function hideFields(options = {}) {
  return function(context) {
    const conditions =
      context.type === 'before' && (context.method === 'find' || context.method === 'get');
    const query = isNil(context.params.query) ? {} : context.params.query;

    if (conditions) {
      context.params.query = Object.assign(query, {
        $select: {
          ...options
        }
      });
    }
  };
};

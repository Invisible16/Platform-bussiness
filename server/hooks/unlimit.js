module.exports = function() {
  return context => {
    if (context.params.query.$limit === '-1') {
      context.params.paginate = false;
      delete context.params.query.$limit;
    }
  };
};

const createService = require('feathers-sequelize');
const createModel = require('../../models/user.model');
const hooks = require('./users.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const base = app.get('base');

  const options = {
    Model,
    paginate
  };

  app.use(`/${base}/users`, createService(options));
  const service = app.service(`${base}/users`);
  service.hooks(hooks);
};

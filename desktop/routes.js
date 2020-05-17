const routes = require('next-routes');

module.exports = () => {
  let adminBase = '';

  if (process.browser) {
    adminBase = ADMIN_BASE;
  } else {
    const config = require('config');
    adminBase = config.get('adminBase');
  }

  const result = routes()
    .add({
      name: 'admin-dashboard',
      pattern: `${adminBase}/dashboard`,
      page: `AdminDashboard`
    })
    .add({
      name: 'admin-login',
      pattern: `${adminBase}/login/:from*`,
      page: `AdminLogin`
    })
    .add({
      name: 'admin-users',
      pattern: `${adminBase}/users`,
      page: `AdminUsers`
    })
    .add({
      name: 'admin-account',
      pattern: `${adminBase}/account`,
      page: `AdminAccount`
    })
    .add({
      name: 'home',
      pattern: `/`,
      page: `Home`
    });

  return result;
};

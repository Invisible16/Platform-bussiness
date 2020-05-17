const config = require('config');
const base = config.get('base');
const protocol = config.get('protocol');
const port = config.get('port');
const host = config.get('host');
const adminBase = config.get('adminBase');
const authentication = config.get('authentication');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'transform-define',
      {
        API: `${protocol}://${host}:${port}/${base}`,
        API_BASE: `/${base}`,
        ADMIN_BASE: `${adminBase}`,
        AUTHENTICATION_CLIENT: {
          header: 'Authorization',
          cookie: authentication.cookie.name,
          storageKey: authentication.cookie.name,
          jwtStrategy: 'jwt',
          path: authentication.path,
          entity: authentication.local.entity,
          service: authentication.service,
          timeout: 5000
        }
      }
    ],
    ['module-resolver', { root: ['./desktop'] }],
    ['import', { libraryName: 'antd', libraryDirectory: 'lib' }, 'ant']
  ]
};

const Package = require('./package.json');

module.exports = {
  apps: [
    {
      name: Package.name,
      script: './server/index.js',
      watch: ['server', 'desktop', 'config'],
      ignore_watch: ['node_modules'],
      source_map_support: true,
      instances: 4,
      post_update: ['yarn'],
      env: {
        NODE_ENV: 'production'
      },
      env_uat: {
        NODE_ENV: 'uat'
      }
    }
  ]
};

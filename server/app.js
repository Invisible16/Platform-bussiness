const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swagger = require('feathers-swagger');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const logger = require('./logger');
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const sequelize = require('./sequelize');
const authentication = require('./authentication');
const app = express(feathers());

// Load app configuration
app.configure(configuration());
const base = app.get('base');
const whitelist = app.get('whitelist');

// Enable security, CORS, compression, favicon and body parsing
app.use(cookieParser('tiki-live-cms'));
app.use(helmet());
app.use(
  cors({
    origin: function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host public files and folders
app.use(`/${base}`, express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());
app.configure(sequelize);
app.configure(
  swagger({
    docsPath: `/${base}/docs`,
    uiIndex: true,
    info: {
      title: 'API',
      description: 'Tiki Live CMS'
    }
  })
);
app.configure(middleware);
app.configure(authentication);
app.configure(services);
app.configure(channels);
app.use(express.notFound());
app.use(express.errorHandler({ logger }));
app.hooks(appHooks);

module.exports = app;

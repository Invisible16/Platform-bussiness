import 'isomorphic-fetch';
import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';
import { isArray } from 'lodash';
import axios from 'axios';

export function request(options) {
  let overrideOptions = Object.assign(
    {
      withCredentials: true
    },
    options
  );
  return axios(overrideOptions);
}

export async function callServiceServer(req, res, services) {
  const restClient = rest(`${API}`);
  const app = feathers();
  app.configure(restClient.fetch(fetch));
  app.configure(auth(AUTHENTICATION_CLIENT));

  if (!isArray(services)) {
    return getService(services, app);
  }
  return await Promise.all(services.map(e => getService(e, app)));
}

export function callServiceClient(services) {
  const restClient = rest(`${API_BASE}`);
  const app = feathers();
  app.configure(restClient.fetch(fetch));
  app.configure(auth(AUTHENTICATION_CLIENT));

  if (!isArray(services)) {
    return getService(services, app);
  }
  return Promise.all(services.map(e => getService(e, app)));
}

export function callLoginClient({ payload }) {
  const restClient = rest(`${API_BASE}`);
  const app = feathers();
  app.configure(restClient.fetch(fetch));
  app.configure(auth(AUTHENTICATION_CLIENT));

  return app.authenticate({
    ...payload,
    strategy: 'local'
  });
}

export function callLogoutClient() {
  const restClient = rest(`${API_BASE}`);
  const app = feathers();
  app.configure(restClient.fetch(fetch));
  app.configure(auth(AUTHENTICATION_CLIENT));

  return app.logout();
}

export async function checkAccessToken({ accessToken, req }) {
  const isServer = req ? true : false;
  let restClient = null;

  if (isServer) {
    restClient = rest(`${API}`);
  } else {
    restClient = rest(`${API_BASE}`);
  }

  const app = feathers();
  app.configure(restClient.fetch(fetch));
  app.configure(auth(AUTHENTICATION_CLIENT));

  return await app.authenticate({
    strategy: 'jwt',
    accessToken
  });
}

function getService(service, app) {
  if (service.method === 'find') {
    return app.service(service.url).find({ query: service.query });
  } else if (service.method === 'get') {
    return app.service(service.url).get(service.id, { query: service.query });
  } else if (service.method === 'create') {
    return app.service(service.url).create(service.params);
  } else if (service.method === 'patch') {
    return app.service(service.url).patch(service.id, service.params);
  } else if (service.method === 'remove') {
    return app.service(service.url).remove(service.id);
  }
}

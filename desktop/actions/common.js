import { callLoginClient, callLogoutClient } from 'utils';

const prefix = 'COMMON';

export const loginAdmin = ({ payload, callback, handleError }) => ({
  type: `${prefix}_LOGIN_ADMIN`,
  promise: callLoginClient({
    payload
  }),
  callback,
  handleError
});

export const logoutAdmin = ({ callback, handleError }) => ({
  type: `${prefix}_LOGOUT_ADMIN`,
  promise: callLogoutClient(),
  callback,
  handleError
});

export const getAdmin = json => ({
  type: `${prefix}_GET_ADMIN`,
  json
});

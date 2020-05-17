import { callServiceClient } from 'utils';

const prefix = 'ADMIN_USERS';

export const getUsers = ({ query, callback, handleError }) => ({
  type: `${prefix}_GET_USERS`,
  promise: callServiceClient({
    url: 'users',
    method: 'find',
    query
  }),
  callback,
  handleError
});

export const createUser = ({ params, callback, handleError }) => ({
  type: `${prefix}_CREATE_USER`,
  promise: callServiceClient({
    url: 'users',
    method: 'create',
    params: {
      ...params,
      params: {}
    }
  }),
  callback,
  handleError
});

export const updateUser = ({ id, params, callback, handleError }) => ({
  type: `${prefix}_UPDATE_USER`,
  promise: callServiceClient({
    url: 'users',
    method: 'patch',
    id,
    params
  }),
  callback,
  handleError
});

export const deleteUser = ({ id, callback, handleError }) => ({
  type: `${prefix}_DELETE_USER`,
  promise: callServiceClient({
    url: 'users',
    method: 'remove',
    id
  }),
  callback,
  handleError
});

export const getStaffs = ({ query, callback, handleError }) => ({
  type: `${prefix}_GET_STAFFS`,
  promise: callServiceClient({
    url: 'staffs',
    method: 'find',
    query
  }),
  callback,
  handleError
});

export const resetUsers = () => ({
  type: `${prefix}_RESET`
});

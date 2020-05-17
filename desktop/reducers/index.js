import { combineReducers } from 'redux';

import common from './common';
import adminUsers from './admin-users';

export default combineReducers({
  common,
  adminUsers
});

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from 'reducers';

function promiseMiddleware() {
  return next => action => {
    const { promise, type, callback, handleError, ...rest } = action;
    if (!promise) return next(action);

    const SUCCESS = type;
    const REQUEST = `${type}_REQUEST`;
    const FAILURE = `${type}_FAILURE`;
    next({ ...rest, type: REQUEST });

    return promise
      .then(res => {
        next({ ...rest, json: res, type: SUCCESS });
        if (callback) {
          callback(res);
        }
        return true;
      })
      .catch(error => {
        next({ ...rest, error, type: FAILURE });
        if (handleError) {
          handleError(error);
        }
        console.log(error);
        return false;
      });
  };
}

const middleware = [thunk, promiseMiddleware];

if (process.env.NODE_ENV !== 'production' && process.browser) {
  middleware.push(createLogger());
}

const enhancers = compose(
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default initialState => createStoreWithMiddleware(rootReducer, initialState, enhancers);

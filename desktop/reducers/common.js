const prefix = 'COMMON';

const initState = {
  admin: []
};

export default function common(state = initState, action) {
  switch (action.type) {
    case `${prefix}_LOGIN_ADMIN`: {
      return {
        ...state,
        admin: action.json
      };
    }

    case `${prefix}_GET_ADMIN`: {
      return {
        ...state,
        admin: action.json
      };
    }

    case `${prefix}_LOGOUT_ADMIN`: {
      return {
        ...state,
        admin: []
      };
    }

    default:
      return state;
  }
}

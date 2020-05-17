const prefix = 'ADMIN_USERS';

const initState = {
  data: [],
  pagination: {
    total: 0,
    pageSize: 10,
    current: 1
  },
  created: {},
  updated: {},
  deleted: {},
  staffs: []
};

export default function(state = initState, action) {
  switch (action.type) {
    case `${prefix}_GET_USERS`: {
      const { limit, total, skip, data } = action.json;
      return {
        ...state,
        data,
        pagination: {
          total,
          pageSize: limit,
          current: Math.floor(skip / limit) + 1
        }
      };
    }

    case `${prefix}_CREATE_USER`: {
      return {
        ...state,
        created: action.json
      };
    }

    case `${prefix}_UPDATE_USER`: {
      return {
        ...state,
        updated: action.json
      };
    }

    case `${prefix}_DELETE_USER`: {
      return {
        ...state,
        deleted: action.json
      };
    }

    case `${prefix}_GET_STAFFS`: {
      return {
        ...state,
        staffs: action.json
      };
    }

    case `${prefix}_RESET`: {
      return initState;
    }

    default:
      return state;
  }
}

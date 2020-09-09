import {
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER_FROM_LIST_SUCCESS,
  UPDATE_USER_FROM_LIST_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  IS_LOADING,
  SET_TEMPORARY_PASSWORD,
  CLEAR_TEMPORARY_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  GET_MEMBERSHIPS_ERROR,
  GET_MEMBERSHIPS_SUCCESS,
  RESET_NOTIFICATION,
  OPEN_MODAL,
  SET_FORM_DATA,
  CLOSE_MODAL,
  SET_ACTIVE_TAB_INDEX,
} from './actionTypes';

const initialState = {
  users: [],
  membership: [],
  isLoading: false,
  temporaryPassword: '',
  error: null,
  message: '',
  status: '',
  activeTabIndex: 0,
  modal: {},
  formData: {
    firstName: '',
    lastName: '',
    email: '',
  },
};

const usersListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_SUCCESS: {
      const users = [...payload].sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        users,
      };
    }
    case GET_MEMBERSHIPS_SUCCESS: {
      const data = payload.map(({ Users, id, name }) => {
        return {
          id,
          name,
          users: Users.map((user) => {
            return {
              userId: user.id,
              usersUserGroupsId: user.UsersUserGroups.id,
            };
          }),
        };
      });

      data.sort((firstGroup, secondGroup) => firstGroup.name.localeCompare(secondGroup.name));

      return {
        ...state,
        membership: data,
      };
    }
    case GET_MEMBERSHIPS_ERROR: {
      return {
        ...state,
        error: payload,
        temporaryPasswords: '',
        membership: [],
        message: payload.message,
        status: 'error',
      };
    }
    case ADD_USER_ERROR:
    case DELETE_USER_ERROR:
    case UPDATE_USER_FROM_LIST_ERROR:
    case GET_USERS_ERROR:
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        error: payload,
        temporaryPasswords: '',
        message: payload.message,
        status: 'error',
      };
    }
    case ADD_USER_SUCCESS:
    case UPDATE_USER_FROM_LIST_SUCCESS:
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: 'Data successfully updated',
        status: 'success',
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        temporaryPassword: payload.password,
      };
    }
    case SET_TEMPORARY_PASSWORD: {
      return {
        ...state,
        temporaryPassword: payload,
      };
    }
    case CLEAR_TEMPORARY_PASSWORD: {
      return {
        ...state,
        message: null,
        temporaryPassword: '',
      };
    }
    case RESET_NOTIFICATION: {
      return {
        ...state,
        message: null,
        status: null,
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case OPEN_MODAL: {
      return {
        ...state,
        modal: { user: payload.user, type: payload.type, open: true },
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modal: {},
        formData: {
          firstName: '',
          lastName: '',
          email: '',
        },
      };
    }
    case SET_FORM_DATA: {
      return {
        ...state,
        formData: payload,
      };
    }
    case SET_ACTIVE_TAB_INDEX: {
      return {
        ...state,
        activeTabIndex: payload,
      };
    }
    default:
      return state;
  }
};

export default usersListReducer;

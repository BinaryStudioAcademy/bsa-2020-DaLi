import {
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  IS_LOADING,
  RESET_ERROR,
  SET_TEMPORARY_PASSWORD,
  CLEAR_TEMPORARY_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  GET_MEMBERSHIPS_ERROR,
  GET_MEMBERSHIPS_SUCCESS,
} from './actionTypes';

const initialState = {
  users: [],
  membership: [],
  isLoading: false,
  temporaryPassword: '',
  error: null,
  message: '',
  status: '',
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
    case ADD_USER_ERROR:
    case DELETE_USER_ERROR:
    case UPDATE_USER_ERROR:
    case GET_USERS_ERROR:
    case RESET_PASSWORD_ERROR:
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
    case ADD_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
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
    case RESET_ERROR: {
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
    default:
      return state;
  }
};

export default usersListReducer;

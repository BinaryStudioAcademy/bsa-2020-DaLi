import { GET_USER_GROUPS_SUCCESS, GET_USER_GROUP_SUCCESS, IS_LOADING, SET_ERROR, RESET_ERROR } from './actionTypes';

const initialState = {
  groups: [],
  currentGroup: {},
  isLoading: false,
  isError: false,
  messageError: '',
};

const userGroupsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_GROUPS_SUCCESS: {
      return {
        ...state,
        groups: [...payload],
      };
    }
    case GET_USER_GROUP_SUCCESS: {
      return {
        ...state,
        currentGroup: { ...payload },
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        isError: true,
        messageError: payload.message,
      };
    }
    case RESET_ERROR: {
      return {
        ...state,
        messageError: '',
        isError: false,
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

export default userGroupsReducer;

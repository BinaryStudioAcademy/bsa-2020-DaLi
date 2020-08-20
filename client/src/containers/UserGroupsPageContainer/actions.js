import {
  IS_LOADING,
  RESET_ERROR,
  GET_USER_GROUPS,
  GET_USER_GROUP,
  ADD_USER_GROUP,
  UPDATE_USER_GROUP,
  DELETE_USER_GROUP,
  ADD_USER_TO_GROUP,
  DELETE_USER_FROM_GROUP,
  SET_ERROR,
} from './actionTypes';

export const SetIsLoading = (payload) => {
  return {
    type: IS_LOADING,
    payload,
  };
};

export const setError = (payload) => {
  return {
    type: SET_ERROR,
    payload,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

export const getUserGroups = () => {
  return {
    type: GET_USER_GROUPS,
  };
};

export const getUserGroup = (id) => {
  return {
    type: GET_USER_GROUP,
    id,
  };
};

export const addUserGroup = (userGroup) => {
  return {
    type: ADD_USER_GROUP,
    userGroup,
  };
};

export const updateUserGroup = (payload) => {
  return {
    type: UPDATE_USER_GROUP,
    payload,
  };
};

export const deleteUserGroup = (id) => {
  return {
    type: DELETE_USER_GROUP,
    id,
  };
};

export const addUserToGroup = (usersId, userGroupsId) => {
  return {
    type: ADD_USER_TO_GROUP,
    usersId,
    userGroupsId,
  };
};

export const deleteUserFromGroup = (userGroupsId, usersUserGroupsId) => {
  return {
    type: DELETE_USER_FROM_GROUP,
    userGroupsId,
    usersUserGroupsId,
  };
};
